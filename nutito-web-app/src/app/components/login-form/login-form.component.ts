import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginFormGroup } from 'src/app/forms-validation/login-form.group';
import { LoadingService } from '../../services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'login-form-component',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private router: Router,
    private loader: LoadingService,
    private authService: AuthenticationService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: LoginFormGroup = new LoginFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var email = this.formGroup.controls['email'].value;
    var password = this.formGroup.controls['password'].value;
    if ((email as string).length !== 0 && (password as string).length !== 0) {
      this._loader = this.loader.loader;
      this.loginUser(email, password);
    } else {
      this.loginFailureMsg = "Veuillez entrer votre email et mot de passe";
    }
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
