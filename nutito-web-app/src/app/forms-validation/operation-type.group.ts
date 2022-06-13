import { BaseFormGroup } from './base-form.group';
import { Validators } from '@angular/forms';
import { FormFieldControl } from './form-control';
export class OperationTypeFormGroup extends BaseFormGroup{
    constructor(){
      super({
        name: new FormFieldControl(
          "name",
          "name",
          '',
          Validators.compose([Validators.required,])
        ),
        description: new FormFieldControl(
          "description",
          "description",
          '',
          Validators.compose([Validators.required])
        ),
        type: new FormFieldControl(
          "type",
          "type",
          '',
          Validators.compose([Validators.required])
        )
      })
    }
}
