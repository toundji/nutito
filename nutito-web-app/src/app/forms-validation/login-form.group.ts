import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';


export class LoginFormGroup extends BaseFormGroup {
  constructor() {
    super({
      email: new FormFieldControl(
        "email",
        "email",
        "",
        Validators.compose([Validators.required]),),
      password: new FormFieldControl(
        "mot de passe",
        "password",
        "",
        Validators.compose([Validators.required]))
    });
  }
}
