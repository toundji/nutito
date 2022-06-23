import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PasswordResetFormGroup } from '../../forms-validation/password-reset-form.group';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html'
})

export class PasswordResetFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loader: LoadingService,
    private authService: AuthenticationService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: PasswordResetFormGroup = new PasswordResetFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var email = sessionStorage.getItem('user_email');
    var oldPassword = this.formGroup.controls['oldPassword'].value;
    var newPassword = this.formGroup.controls['password'].value;
    if ((email as string).length !== 0 && (oldPassword as string).length !== 0 && (newPassword as string).length !== 0) {
      this._loader = this.loader.loader;
      this.resetPassword(email!, oldPassword, newPassword)
    } else {
      this.loginFailureMsg = "Veuillez entrer votre email et mot de passe";
    }
  }

  resetPassword(email: string, oldPassword: string, newPassword: string) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.authService.resetPassword(email, oldPassword, newPassword).subscribe(
      (response) => {
        spinner.className = ""
        console.log(response)
        this.formSubmitted = false;
        this._loader = "";
        this.formGroup.reset();
        this.router.navigateByUrl("/dashboard")
      },
      (error: HttpErrorResponse) => {
        spinner.className = ""
        this.formSubmitted = false;
        this._loader = "";
        if (error.status === 400 || error.status === 404) {
          this.loginFailureMsg = "Une erreur est survenue. Veuillez réessayer";
        }
      }
    );
  }
}
