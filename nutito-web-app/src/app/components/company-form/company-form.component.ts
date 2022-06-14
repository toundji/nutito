import { CompanyFormGroup } from './../../forms-validation/company.group';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {



  constructor(
    private router: Router,
    private loader: LoadingService,
    private companyService: CompanyService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: CompanyFormGroup = new CompanyFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var name = this.formGroup.controls['name'].value;
    var description = this.formGroup.controls['description'].value;
    if ((name as string).length !== 0 && (description as string).length !== 0) {
      this._loader = this.loader.loader;
      this.createAgentRole(name, description);
    } else {
      this.loginFailureMsg = "Veuillez entrer votre email et mot de passe";
    }
  }

  createAgentRole(name: string, description: string) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.companyService.createAgentRole(name, description).subscribe(
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
          this.loginFailureMsg = "Role ou Description  incorrect";
        }
      }
    );
  }
}
