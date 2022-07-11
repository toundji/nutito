import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { UserFormGroup } from '../../forms-validation/user-form.group';
import { countries } from '../../services/countries';
import { User } from 'src/app/models/user.model';
import { UploadService } from '../../services/upload.service';
import { swalAnimation, swalSuccess } from 'src/utils/ui-constants';
import { swalError } from '../../../utils/ui-constants';

@Component({
  selector: 'user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService
    ) {  }

  @Input() operation: string = "create"

  newUser: any = new User();
  formSubmitted: boolean = false;
  formGroup: UserFormGroup = new UserFormGroup();
  operationErrorMessage = "";
  countries: any[] = countries
  benin = this.countries[0]
  selectedCountryName: string = "Bénin"
  dialCode: string = "+229"
  profilePicture: any
  
  onChange(value: any) {
    this.selectedCountryName = value
    this.dialCode = this.countries.find(country => country.name === this.selectedCountryName).dial_code
  }

  getProfilePicture(value: any) {
    console.log(value)
    this.profilePicture = value
  }

  ngOnInit(): void { }

  submitForm() {
    Object.keys(this.formGroup.controls).forEach(c => this.newUser[c] = this.formGroup.controls[c].value);
    this.newUser.phone = this.dialCode.concat(this.formGroup.controls["phone"].value)
    this.formSubmitted = true;
    console.log(this.newUser)
    if (this.operation === "update") {
      this.formGroup.clearValidators()
    }
    if (this.formGroup.valid) {
      this.createUser()
    }
  }

  createUser() {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.userService.create(this.newUser).subscribe(
      (user) => {
        this.uploadService.create(this.profilePicture, user.id).subscribe(
          (response) => {
            spinner.className = ""
            this.formSubmitted = false;
            let modalCloseBtn = document.getElementById("modalCloseBtn")!
            modalCloseBtn.click();
            Swal.fire(swalSuccess)
            this.reloadComponent()
          },
          (error: HttpErrorResponse) => {
            Swal.fire(swalError)
            console.log(error)
            spinner.className = ""
            this.formSubmitted = false;
            this.operationErrorMessage = error.message
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        spinner.className = ""
        this.formSubmitted = false;
        this.operationErrorMessage = error.message
      }
    )
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
