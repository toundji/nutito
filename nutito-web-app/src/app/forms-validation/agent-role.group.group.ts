import { Validators } from '@angular/forms';
import { FormFieldControl } from './form-control';
import { FormGroup } from '@angular/forms';
import { BaseFormGroup } from './base-form.group';
export class AgentRoleFormGroup extends BaseFormGroup{
    constructor(){
      super({
        name: new FormFieldControl(
          "name",
          "name",
          "",
          Validators.compose([Validators.required,])
        ),
        description: new FormFieldControl(
          "description",
          "description",
          "",
          Validators.compose([Validators.required])
        )
      })
    }
}
