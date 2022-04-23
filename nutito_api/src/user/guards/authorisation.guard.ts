import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthorisationFactory } from "../services/authorisation.factory";
import { REQUIRED_AUTHORISATIONS } from '../../utilities/decorators/authorisations.decorator';
import { ForbiddenError } from "@casl/ability";
import { Authorisation } from "../../utilities/types/authorisation.type";
import { DOES_NOT_REQUIRE_AUTHORISATIONS } from '../../utilities/decorators/does-not-require-authorisations.decorator';

@Injectable()
export class AuthorisationsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorisationFactory: AuthorisationFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // This is to know if the controller method is excluded 
    // from the methods that this guard applied to
    const doesNotRequireAuthorisations = this.reflector.get<boolean>(
      DOES_NOT_REQUIRE_AUTHORISATIONS,
      context.getHandler()
    );
    if (doesNotRequireAuthorisations) {
      return true;
    }
    const authorisations = this.reflector.get<Authorisation[]>(
      REQUIRED_AUTHORISATIONS,
      context.getHandler(),
    ) || [];
    const { user } = context.switchToHttp().getRequest();
    const ability = this.authorisationFactory.defineAuthorisationFor(user);
    authorisations.forEach((authorisation) => {
      ForbiddenError.from(ability).throwUnlessCan(authorisation.action, authorisation.subject)
    });
    return true;
  }
}