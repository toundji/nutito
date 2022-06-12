import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";


export class BaseFormGroup extends FormGroup {
  constructor(
    controls: { [key: string]: AbstractControl;},
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }


  get fieldControls(): FormFieldControl[] {
    return Object.keys(this.controls)
        .map(k => this.controls[k] as FormFieldControl);
  }

  getValidationMessages(name: string): string[] {
    return (this.controls[name] as FormFieldControl).getValidationMessages();
  }

  getFormValidationMessages() : string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach(c =>
        messages.push(...(c as FormFieldControl).getValidationMessages()));
    return messages;
  }
}
