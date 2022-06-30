import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFormGroup } from 'src/app/forms-validation/login-form.group';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'client-operation-form-component',
  templateUrl: './client-operation-fom.component.html',
  styleUrls: ['./client-operation-form.component.css']
})
export class ClientOperationFormComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService
    ) { }

  formSubmitted: boolean = false;
  formGroup: LoginFormGroup = new LoginFormGroup();
  loginFailureMsg = "";

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var email = this.formGroup.controls['email'].value;
    var password = this.formGroup.controls['password'].value;
    if ((email as string).length !== 0 && (password as string).length !== 0) {
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
        if (error.status === 400 || error.status === 404) {
          this.loginFailureMsg = "Email ou mot de passe incorrect";
        }
      }
    );
  }
}
