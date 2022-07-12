import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { WorkfieldService } from '../../services/workfield.service';
import { Workfield } from '../../models/workfield.model';
import { WorkfieldFormGroup } from '../../forms-validation/workfield-form.group';
import { swalAnimation, swalSuccess } from 'src/utils/ui-constants';
import { swalError } from '../../../utils/ui-constants';

@Component({
  selector: 'workfield-form-component',
  templateUrl: './workfield-form.component.html',
  styleUrls: ['./workfield-form.component.css']
})
export class WorkfieldFormComponent implements OnInit {

  constructor(
    private router: Router,
    private workfieldService: WorkfieldService
    ) {  }

  @Input() operation: string = "create"

  newWorkfield: any = new Workfield();
  formSubmitted: boolean = false;
  formGroup: WorkfieldFormGroup = new WorkfieldFormGroup();
  operationErrorMessage = "";

  ngOnInit(): void {
    console.log(this.operation)
  }

  submitForm() {
    Object.keys(this.formGroup.controls).forEach(c => this.newWorkfield[c] = this.formGroup.controls[c].value);
    this.formSubmitted = true;
    if (this.operation === "update") {
      this.formGroup.clearValidators()
    }
    if (this.formGroup.valid) {
      this.createWorkfield()
    }
  }

  createWorkfield() {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.workfieldService.create(this.newWorkfield).subscribe(
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
