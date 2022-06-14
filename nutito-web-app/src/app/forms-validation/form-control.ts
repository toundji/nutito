import { FormControl } from "@angular/forms";

export class FormFieldControl extends FormControl {
  label: string;
  modelProperty: string;
  constructor(label: string, property: string, value: any, validator: any, asyncValidator?: any) {
    super(value, validator, asyncValidator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "required":
            messages.push(`Le champ ${this.label} est requis`);
            break;
          case "minLength":
            messages.push(`Le ${this.label} doit être de ${this.errors['minLength'].requiredLength} caractères au moins`);
            break;
          case "maxLength":
            messages.push(`Le ${this.label} doit être de ${this.errors['maxLength'].requiredLength} caractères au plus`);
            break;
          case "email":
              messages.push("L'adresse email est invalide");
              break;
          case "pattern":
            messages.push(`Le format de l'${this.label} est incorrect`);
            break;
          case "notEquivalent" :
            messages.push("Les deux mots de passe ne correspondent pas");
            break;
        }
      }
    }
    return messages;
  }
}
