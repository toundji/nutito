import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { countries } from 'src/app/services/countries';
import { CompanyFormGroup } from '../../forms-validation/company-form.group';
import { WorkfieldService } from '../../services/workfield.service';
import { CompanyCategoryService } from '../../services/company-category.service';
import Swal from 'sweetalert2';
import { swalError, swalSuccess } from 'src/utils/ui-constants';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'company-form-component',
  templateUrl: 'company-form.component.html'
})

export class CompanyFormComponent implements OnInit {

  constructor(
    private workfieldService: WorkfieldService,
    private companyCategoryService: CompanyCategoryService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  formGroup: CompanyFormGroup = new CompanyFormGroup();

  newCompany: any = new Company();
  formSubmitted: boolean = false;
  operationErrorMessage = "";
  countries: any[] = countries
  companyCategories: any[] = []
  workfields: any[] = []
  benin = this.countries[0]

  selectedCountryName: string = "Bénin"
  dialCode: string = "+229"
  profilePicture: any
  selectedWorkfields: any[] = [];
  selectedCompanyCategories: any[] = [];
  workfieldsDropDownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    noDataAvailablePlaceholderText: "Aucune option trouvée",
    searchPlaceholderText: "Rechercher un secteur d'activité",
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  companyCategoriesDropDownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    noDataAvailablePlaceholderText: "Aucune option trouvée",
    searchPlaceholderText: "Rechercher un secteur d'activité",
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  onChange(value: any) {
    this.selectedCountryName = value
    this.dialCode = this.countries.find(country => country.name === this.selectedCountryName).dial_code
  }

  getProfilePicture(value: any) {
    console.log(value)
    this.profilePicture = value
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.getWorkfields()
    this.getCompanyCategories()
  }

  submitForm() {
    this.formSubmitted = true;
    Object.keys(this.formGroup.controls).forEach(
      c => this.newCompany[c] = this.formGroup.controls[c].value
    );
    if (this.formGroup.valid) {
      this.newCompany.companyCategoryId = this.selectedCompanyCategories[0].id
      this.newCompany.workfields = this.newCompany.workfields.map((selected: any) => selected.id)
      this.newCompany.user_phone = JSON.parse(localStorage.getItem("customer")!).phone
      console.log(this.newCompany)
      this.createCompany()
    }
  }

  createCompany() {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"

    this.companyService.create(this.newCompany).subscribe(
      (response) => {
        localStorage.setItem("customer", JSON.stringify(response.owner))
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

  }

  getWorkfields() {
    this.workfieldService.getAll().subscribe(
      (data) => {
        this.workfields = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getCompanyCategories() {
    this.companyCategoryService.getAll().subscribe(
      (data) => {
        this.companyCategories = data
      },
      (error: HttpErrorResponse) => {
        console.log(error)
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
