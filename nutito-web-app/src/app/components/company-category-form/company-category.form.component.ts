import { CompanyCategoryService } from './../../services/company-type.service';
import { OperationTypeFormGroup } from '../../forms-validation/operation-type.group';
import { OperationTypeService } from '../../services/operation-type.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginFormGroup } from 'src/app/forms-validation/login-form.group';

@Component({
  selector: 'app-operation-category-form',
  templateUrl: './company-category.component.html',
  styleUrls: ['./company-category-form.component.css']
})
export class CompanyCategoryFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loader: LoadingService,
    private companyCategoryService: CompanyCategoryService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: OperationTypeFormGroup = new OperationTypeFormGroup();
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
      this.loginFailureMsg = "Les deux champs sont requis";
    }
  }

  createAgentRole(name: string, description: string) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.companyCategoryService.createAgentRole(name, description).subscribe(
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
          this.loginFailureMsg = "Name ou Description  incorrect";
        }
      }
    );
  }
}
