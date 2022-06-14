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
        date: new FormFieldControl(
          "date",
          "date",
          '',
          Validators.compose([Validators.required])
        ),
        amount: new FormFieldControl(
          "amount",
          "amount",
          '',
          Validators.compose([Validators.required])
        ),
        amount_in: new FormFieldControl(
          "amount_in",
          "amount_in",
          '',
          Validators.compose([Validators.required])
        ),
        amount_out: new FormFieldControl(
          "amount_out",
          "amount_out",
          '',
          Validators.compose([Validators.required])
        ),
        balance: new FormFieldControl(
          "balance",
          "balance",
          '',
          Validators.compose([Validators.required])
        ),
        description: new FormFieldControl(
          "description",
          "description",
          '',
          Validators.compose([Validators.required])
        ),
        clientOperationType: new FormFieldControl(
          "clientOperationType",
          "clientOperationType",
          '',
          Validators.compose([Validators.required])
        ),
        document: new FormFieldControl(
          "document",
          "document",
          '',
          Validators.compose([Validators.required])
        ),
        operationType: new FormFieldControl(
          "operationType",
          "operationType",
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
