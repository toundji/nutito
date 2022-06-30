import { Component, OnInit } from '@angular/core';
import { dataTableSettings } from "../../../utils/ui-constants";
import { AgentRoleService } from '../../services/agent-role.service';
import { AgentRole } from '../../models/agent-role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import "animate.css"
import Swal from 'sweetalert2';

@Component({
  selector: 'client-operations-list-component',
  templateUrl: './client-operations-form-list.component.html',
  styleUrls: ['./client-operations-form-list.component.css']
})
export class ClientOperationsListComponent implements OnInit {

  constructor(private agentsRoleService: AgentRoleService) { }

  agentRoles: AgentRole[] = [];

  dtOptions: DataTables.Settings = dataTableSettings

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getAgentsRoles()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAgentsRoles() {
    this.agentsRoleService.getAll().subscribe(
      (data) => {
        this.agentRoles = data
        this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }


  deleteAgentRole(agentRole: AgentRole) {
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
        this.agentRoles.splice(this.agentRoles.indexOf(agentRole), 1);
        this.agentsRoleService.delete(agentRole).subscribe(
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
