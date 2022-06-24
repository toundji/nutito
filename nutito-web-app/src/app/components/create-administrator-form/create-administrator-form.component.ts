import { CreateAdminFormGroup } from './../../forms-validation/create-administrator.group';
import { CreateAdministratorService } from './../../services/create-administrator.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-administrator-form',
  templateUrl: './create-administrator-form.component.html',
  styleUrls: ['./create-administrator-form.component.css']
})
export class CreateAdminFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loader: LoadingService,
    private createAdministratorService: CreateAdministratorService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: CreateAdminFormGroup = new CreateAdminFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var email = this.formGroup.controls['email'].value;
    var firstname = this.formGroup.controls['firstname'].value;
    var lastname = this.formGroup.controls['lastname'].value;

    if ((firstname as string).length !== 0 && (lastname as string).length !== 0 && (email as string).length !== 0) {
      this._loader = this.loader.loader;
      this.createAdmin(firstname, lastname, email,);
    } else {
      this.loginFailureMsg = "Les deux champs sont requis";
    }
  }

  createAdmin(firstname: string, lastname: string, email: string) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.createAdministratorService.createAdmin(firstname, lastname, email).subscribe(
      (response) => {
        spinner.className = ""
        var message = response['message'];
        this.formSubmitted = false;
        this._loader = "";
        this.formGroup.reset();

        this.router.navigateByUrl("/dashboard") //rediriger sur la liste de AgentRole
      },
      (error: HttpErrorResponse) => {
        spinner.className = ""
        this.formSubmitted = false;
        this._loader = "";
        if (error.status === 400 || error.status === 404) {
          this.loginFailureMsg = "Name ou lastname  incorrect";
        }
      }
    );
  }
}
