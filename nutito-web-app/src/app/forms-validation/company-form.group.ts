import { Validators } from '@angular/forms';
import { FormFieldControl } from './form-control';
import { BaseFormGroup } from './base-form.group';

export class CompanyFormGroup extends BaseFormGroup {
  constructor() {
    super({
      name: new FormFieldControl(
        'nom',
        'name',
        '',
        Validators.compose([Validators.required])
      ),
      description: new FormFieldControl(
        'description',
        'description',
        '',
        Validators.compose([Validators.required])
      ),
      email: new FormFieldControl(
        'email',
        'email',
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      phone: new FormFieldControl(
        'numéro de téléphone',
        'phone',
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
          ),
        ])
      ),
      address: new FormFieldControl(
        'adresse de l\'entreprise',
        'address',
        '',
        Validators.compose([Validators.required])
      ),
      country: new FormFieldControl(
        'pays siège',
        'country',
        '',
        Validators.compose([Validators.required])
      ),
      city: new FormFieldControl(
        'ville siège',
        'city',
        '',
        Validators.compose([Validators.required])
      ),
      ifu: new FormFieldControl(
        'numéro ifu',
        'ifu',
        '',
        Validators.compose([Validators.required])
      ),
      rccm: new FormFieldControl(
        'registre de commerce',
        'rccm',
        '',
        Validators.compose([Validators.required])
      ),
      workfields: new FormFieldControl(
        "domaines d'activité",
        "workfields",
        "",
        Validators.compose([])),
      companyCategoryId: new FormFieldControl(
        "catégorie entreprise",
        "companyCategoryId",
        "",
        Validators.compose([])),
    });
  }
}
