import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dataTableSettings, swalDeleteConfirm } from '../../../utils/ui-constants';
import { AgentRoleService } from '../../services/agent-role.service';
import { AgentRole } from '../../models/agent-role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'agent-roles-list-component',
  templateUrl: './agent-roles-list.component.html',
  styleUrls: ['./agent-roles-list.component.css']
})
export class AgentRolesListComponent implements OnInit {

  constructor(
    private agentsRoleService: AgentRoleService,
    private router: Router
  ) { }

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
    Swal.fire(swalDeleteConfirm).then((result) => {
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

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
