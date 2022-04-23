import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DOES_NOT_REQUIRE_AUTHENTICATION } from '../../utilities/decorators/does-not-require-authentication.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const doesNotRequireAuthentication = this.reflector.get<boolean>(
            DOES_NOT_REQUIRE_AUTHENTICATION,
            context.getHandler()
        );
        if (doesNotRequireAuthentication) {
            return true;
        }
        return super.canActivate(context);
    }
}
