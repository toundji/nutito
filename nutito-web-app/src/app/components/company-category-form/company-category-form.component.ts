import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CompanyCategoryService } from '../../services/company-category.service';
import { CompanyCategoryFormGroup } from '../../forms-validation/company-category-form.group';
import { CompanyCategory } from '../../models/company-category.model';
import { swalSuccess, swalError } from '../../../utils/ui-constants';

@Component({
  selector: 'company-category-form-component',
  templateUrl: './company-category-form.component.html',
  styleUrls: ['./company-category-form.component.css']
})
export class CompanyCategoryFormComponent implements OnInit {

  constructor(
    private router: Router,
    private companyCategoryService: CompanyCategoryService
    ) { }

  newCompanyCategory: any = new CompanyCategory();
  formSubmitted: boolean = false;
  formGroup: CompanyCategoryFormGroup = new CompanyCategoryFormGroup();
  operationErrorMessage = "";

  ngOnInit(): void {}

  submitForm() {
    Object.keys(this.formGroup.controls).forEach(c => this.newCompanyCategory[c] = this.formGroup.controls[c].value);
    this.formSubmitted = true;
    if (this.formGroup.valid) {
      this.createCompanyCategory()
    }
  }

  createCompanyCategory() {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.companyCategoryService.create(this.newCompanyCategory).subscribe(
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
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
