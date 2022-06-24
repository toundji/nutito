import { Validators } from '@angular/forms';
import { FormFieldControl } from './form-control';
import { BaseFormGroup } from './base-form.group';
export class CreateAdminFormGroup extends BaseFormGroup{
    constructor(){
      super({
        name: new FormFieldControl(
          "firstname",
          "firstname",
          '',
          Validators.compose([Validators.required,])
        ),
        description: new FormFieldControl(
          "lastname",
          "lastname",
          '',
          Validators.compose([Validators.required])
        ),
        email: new FormFieldControl(
          "email",
          "email",
          '',
          Validators.compose([Validators.required])
        )
      })
    }
}
