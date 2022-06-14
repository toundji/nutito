import { licenceFormGroup } from './../../forms-validation/licence.group';
import { LicenceService } from './../../services/licence.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-licence-form',
  templateUrl: './licence-form.component.html',
  styleUrls: ['./licence-form.component.css']
})
export class LicenceFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loader: LoadingService,
    private LicenceService: LicenceService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: licenceFormGroup = new licenceFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var numbermouth = this.formGroup.controls['numbermouth'].value;
    var paiementtype = this.formGroup.controls['paiementtype'].value;
    var companyid = this.formGroup.controls['companyid'].value;

    if ((paiementtype as string).length !== 0 && (companyid as string).length !== 0 && (numbermouth as string).length !== 0) {
      this._loader = this.loader.loader;
      this.createAdmin(paiementtype, companyid, numbermouth,);
    } else {
      this.loginFailureMsg = "Les deux champs sont requis";
    }
  }

  createAdmin(paiementtype: string, companyid: number, numbermouth: number) {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.LicenceService.createLicence(numbermouth, paiementtype, companyid).subscribe(
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
          this.loginFailureMsg = "Name ou companyid  incorrect";
        }
      }
    );
  }
}
