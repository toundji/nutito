import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentRoleService } from 'src/app/services/agent-role.service';
import { AgentRoleFormGroup } from '../../forms-validation/agent-role-form.group';
import { AgentRole } from '../../models/agent-role.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { swalSuccess, swalError } from '../../../utils/ui-constants';

@Component({
  selector: 'agent-roles-form-component',
  templateUrl: './agent-roles-form.component.html',
  styleUrls: ['./agent-roles-form.component.css']
})
export class AgentRolesFormComponent implements OnInit {

  constructor(
    private router: Router,
    private agentRoleService: AgentRoleService
    ) { }

  newAgentRole: any = new AgentRole();
  formSubmitted: boolean = false;
  formGroup: AgentRoleFormGroup = new AgentRoleFormGroup();
  operationErrorMessage = "";

  ngOnInit(): void {}

  submitForm() {
    Object.keys(this.formGroup.controls).forEach(c => this.newAgentRole[c] = this.formGroup.controls[c].value);
    this.formSubmitted = true;
    if (this.formGroup.valid) {
      this.createAgentRole()
    }
  }

  createAgentRole() {
    let spinner = document.getElementById("loader")!
    spinner.className = "spinner-border spinner-border-sm me-2"
    this.agentRoleService.create(this.newAgentRole).subscribe(
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
