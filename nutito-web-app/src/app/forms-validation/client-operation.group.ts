import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';


export class ClientOperationGroup extends BaseFormGroup {
  constructor() {
    super({
      name: new FormFieldControl(
        "nom",
        "name",
        "",
        Validators.compose([Validators.required])),
        description: new FormFieldControl(
            "description",
            "description",
            "",
        Validators.compose([Validators.required])),
        type: new FormFieldControl(
            "type",
            "type",
            "",
        Validators.compose([Validators.required])),
        company_id: new FormFieldControl(
            "company_id",
            "company_id",
            "",
        Validators.compose([Validators.required])),
    });
  }
}
