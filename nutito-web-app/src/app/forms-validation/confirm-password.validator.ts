import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ConfirmPasswordValidator {
    static mustConfirmPassword() {
      return (control: AbstractControl) : ValidationErrors | null => {
        let password = control.get('password')
        let confirmPassword = control.get('confirmPassword');
        if ((password && confirmPassword) && !(password.value === confirmPassword.value)) {
          return {"passUnconfirmed": {"passUnconfirmed": true}};
        } else {
          return null;
        }
      }
    }
}
