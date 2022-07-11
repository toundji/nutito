import { Component, OnInit } from '@angular/core';
import { dataTableSettings } from "../../../utils/ui-constants";
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import "animate.css"
import Swal from 'sweetalert2';
import { OperationType } from '../../models/operation-type.model';
import { OperationTypeService } from '../../services/operation-type.service';

@Component({
  selector: 'operation-types-list-component',
  templateUrl: './operation-types-list.component.html',
  styleUrls: ['./operation-types-list.component.css']
})
export class OperationTypesListComponent implements OnInit {

  constructor(private operationTypeService: OperationTypeService) { }

  operationTypes: OperationType[] = [];

  dtOptions: DataTables.Settings = dataTableSettings

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getOperationTypes()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getOperationTypes() {
    this.operationTypeService.getAll().subscribe(
      (data) => {
        this.operationTypes = data.map(obj => new OperationType().fromJSON(obj))
        this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }


  deleteOperationType(opeationType: OperationType) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: "Voulez-vous vraiment procéder à la suppression de cet élément ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer l'élément",
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationTypes.splice(this.operationTypes.indexOf(opeationType), 1);
        this.operationTypeService.delete(opeationType).subscribe(
          (response) => {
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
    });
  }
}
