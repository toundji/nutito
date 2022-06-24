import { Component, OnInit } from '@angular/core';
import { dataTableSettings } from "../../../utils/ui-constants";
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import "animate.css"
import Swal from 'sweetalert2';
import { WorkfieldService } from '../../services/workfield.service';
import { Workfield } from '../../models/workfield.model';
declare var $: any

@Component({
  selector: 'workfields-list-component',
  templateUrl: './workfields-list.component.html',
  styleUrls: ['./workfields-list.component.css']
})
export class WorkfieldsListComponent implements OnInit {

  constructor(private workfieldService: WorkfieldService) { }

  workfields: Workfield[] = [];

  dtOptions: DataTables.Settings = dataTableSettings

  dtTrigger: Subject<any> = new Subject<any>();

  operation = "create"

  ngOnInit(): void {
    this.getWorkfields()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getWorkfields() {
    this.workfieldService.getAll().subscribe(
      (data) => {
        this.workfields = data
        this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }


  deleteWorkfield(workfield: Workfield) {
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
        this.workfields.splice(this.workfields.indexOf(workfield), 1);
        this.workfieldService.delete(workfield).subscribe(
          (response) => {

          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
    });
  }

  toggleOperationVar() {
    console.log("clicked")
    this.operation = "update"
    let modalOpenButton = document.getElementById("modalOpenButton")!
    modalOpenButton?.click()
  }

}
