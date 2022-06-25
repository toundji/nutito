import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';


export class CompanyCategoryFormGroup extends BaseFormGroup {
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
      short: new FormFieldControl(
        "nom court",
        "short",
        "",
        Validators.compose([Validators.required]))
    });
  }
}
