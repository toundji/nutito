import { Validators } from '@angular/forms';
import { FormFieldControl } from './form-control';
import { BaseFormGroup } from './base-form.group';
export class licenceFormGroup extends BaseFormGroup{
    constructor(){
      super({
        numbermonth : new FormFieldControl(
          "numbermonth",
          "numbermonth",
          "",
          Validators.compose([Validators.required])
        ),
        paiementtype : new FormFieldControl(
          "paiementtype",
          "paiementtype",
          "",
          Validators.compose([Validators.required])
        ),
        companyid : new FormFieldControl(
          "companyid",
          "companyid",
          "",
          Validators.compose([Validators.required])
        ),
      })
    }
}
