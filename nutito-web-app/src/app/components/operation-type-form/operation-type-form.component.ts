import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { OperationType } from '../../models/operation-type.model';
import { OperationTypeFormGroup } from '../../forms-validation/operation-type-form.group';
import { WorkfieldService } from '../../services/workfield.service';
import { swalSuccess, swalError } from '../../../utils/ui-constants';
declare var $: any;

@Component({
  selector: 'operation-type-form-component',
  templateUrl: './operation-type-form.component.html',
  styleUrls: ['./operation-type-form.component.css'],
})
export class OperationTypeFormComponent implements OnInit {
  constructor(
    private router: Router,
    private workfieldService: WorkfieldService,
    private operationTypeService: OperationTypeService
  ) {}

  newOperationType: any = new OperationType();
  workfields: any[] = [];
  formSubmitted: boolean = false;
  formGroup: OperationTypeFormGroup = new OperationTypeFormGroup();
  operationErrorMessage = '';
  selectedItems: any[] = [];
  dropDownSettings = {
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

  ngOnInit(): void {
    this.getWorkfields();
  }

  submitForm() {
    Object.keys(this.formGroup.controls).forEach(
      (c) => (this.newOperationType[c] = this.formGroup.controls[c].value)
    );
    this.newOperationType.workField_ids = this.selectedItems.map(item => item.id)
    this.formSubmitted = true;
    if (this.formGroup.valid && this.selectedItems.length !== 0) {
      this.createOperationType();
    }
  }

  createOperationType() {
    let spinner = document.getElementById('loader')!;
    spinner.className = 'spinner-border spinner-border-sm me-2';
    this.operationTypeService.create(this.newOperationType).subscribe(
      (response) => {
        spinner.className = '';
        this.formSubmitted = false;
        let modalCloseBtn = document.getElementById('modalCloseBtn')!;
        modalCloseBtn.click();
        Swal.fire(swalSuccess);
        this.reloadComponent();
      },
      (error: HttpErrorResponse) => {
        Swal.fire(swalError);
        console.log(error)
        spinner.className = '';
        this.formSubmitted = false;
        this.operationErrorMessage = error.message;
      }
    );
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

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}
