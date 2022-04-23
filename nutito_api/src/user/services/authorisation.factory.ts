import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { Action } from "src/utilities/enums/actions.enum";


export type Subjects = InferSubjects<typeof User> | 
  'all';


export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AuthorisationFactory {

  defineAuthorisationFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (user.user_type === "admin") {
      can(Action.Manage, 'all'); 
    } 
    if (user.user_type === "passenger") {
      cannot(Action.Read, User).because("You don't have sufficient permission to do that. It will kill ya");
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}