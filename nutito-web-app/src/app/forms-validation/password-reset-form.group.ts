import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';
import { ConfirmPasswordValidator } from "./confirm-password.validator";


export class PasswordResetFormGroup extends BaseFormGroup {
  constructor() {
    super({
      oldPassword: new FormFieldControl("ancien mot de passe", "oldPassword", "", Validators.compose([Validators.required])),
      password: new FormFieldControl("nouveau mot de passe", "newPassword", "",
        Validators.compose([Validators.required, Validators.minLength(8)])),
      confirmPassword: new FormFieldControl("confirmation de mot de passe", "confirmPassword", "",
        Validators.compose([Validators.required]))
    }, [ConfirmPasswordValidator.mustConfirmPassword()]);
  }
}
