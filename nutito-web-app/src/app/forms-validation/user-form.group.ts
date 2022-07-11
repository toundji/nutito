import { Validators } from "@angular/forms";
import { FormFieldControl } from "./form-control";
import { BaseFormGroup } from './base-form.group';


export class UserFormGroup extends BaseFormGroup {
  
  constructor() {
    super({
      firstname: new FormFieldControl(
        "prénom",
        "firstname",
        "",
        Validators.compose([Validators.required]),),
      lastname: new FormFieldControl(
        "nom",
        "lastname",
        "",
        Validators.compose([Validators.required])),
      email: new FormFieldControl(
        "email",
        "email",
        "",
        Validators.compose([Validators.email])),
      phone: new FormFieldControl(
        "numéro de téléphone",
        "phone",
        "",
        Validators.compose([
          Validators.required, 
          Validators.pattern(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
        ])),
      ifu: new FormFieldControl(
        "numéro ifu",
        "ifu",
        "",
        Validators.compose([])),
      birth_date: new FormFieldControl(
        "date de naissance",
        "birth_date",
        "",
        Validators.compose([])),
      birth_place: new FormFieldControl(
        "lieu de naissance",
        "birth_place",
        "",
        Validators.compose([])),
      address: new FormFieldControl(
        "adresse",
        "address",
        "",
        Validators.compose([])),
      country: new FormFieldControl(
        "pays de résidence",
        "country",
        "",
        Validators.compose([])),
      city: new FormFieldControl(
        "ville de résidence",
        "city",
        "",
        Validators.compose([])),
      profilePicture: new FormFieldControl(
        "image de profil",
        "profilePicture",
        "",
        Validators.compose([])),
      password: new FormFieldControl(
        "mot de passe",
        "password",
        "",
        Validators.compose([])),
    });
  }
}
