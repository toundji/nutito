import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';


export class OperationTypeFormGroup extends BaseFormGroup {
  constructor() {
    super({
      name: new FormFieldControl(
        "nom",
        "name",
        "",
        Validators.compose([Validators.required]),),
      description: new FormFieldControl(
        "description",
        "description",
        "",
        Validators.compose([Validators.required])),
      type: new FormFieldControl(
        "type d'opération",
        "type",
        "",
        Validators.compose([Validators.required])),
      workField_ids: new FormFieldControl(
        "domaines d'activité",
        "workField_ids",
        "",
        Validators.compose([])),
    });
  }
}
