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
    var oldPassword = this.formGroup.controls['oldPassword'].value;
    var newPassword = this.formGroup.controls['password'].value;
    // if ((email as string).length !== 0 && (password as string).length !== 0) {
    //   this._loader = this.loader.loader;
    //   this.loginUser(email, password);
    // } else {
    //   this.loginFailureMsg = "Veuillez entrer votre email et mot de passe";
    // }
  }

  loginUser(login: string, password: string) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.authService.login(login, password).subscribe(
      (response) => {
        spinner.className = ""
        var message = response['message'];
        this.formSubmitted = false;
        this._loader = "";
        this.formGroup.reset();
        var USER_TOKEN = response['access_token'];
        var USER_EMAIL = login;
        window.sessionStorage.setItem("user_token", USER_TOKEN);
        window.sessionStorage.setItem("user_email", USER_EMAIL);
        this.router.navigateByUrl("/dashboard")
      },
      (error: HttpErrorResponse) => {
        spinner.className = ""
        this.formSubmitted = false;
        this._loader = "";
        if (error.status === 400 || error.status === 404) {
          this.loginFailureMsg = "Email ou mot de passe incorrect";
        }
      }
    );
  }
}
