import { Action } from "src/utilities/enums/actions.enum";
import { Subjects } from "../../user/services/authorisation.factory";
import { User } from "../../user/entities/user.entity";

export interface Authorisation {
    action: Action;
    subject: Subjects;
}

export class ReadUserAuthorisation implements Authorisation {
    action =  Action.Read;
    subject = User;
}