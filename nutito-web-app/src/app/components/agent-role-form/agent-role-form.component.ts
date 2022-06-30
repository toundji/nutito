import { AgentRoleService } from './../../services/agent-role.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';
import { AgentRoleFormGroup } from 'src/app/forms-validation/agent-role.group.group';

@Component({
  selector: 'app-agent-role-form',
  templateUrl: './agent-role-form.component.html',
  styleUrls: ['./agent-role-form.component.css']
})
export class AgentRoleFormComponent implements OnInit {
  constructor(
    private router: Router,
    private loader: LoadingService,
    private agentRoleService: AgentRoleService
    ) { }

  loading$ = this.loader.loading$
  formSubmitted: boolean = false;
  formGroup: AgentRoleFormGroup = new AgentRoleFormGroup();
  loginFailureMsg = "";
  _loader: string;

  ngOnInit(): void {}

  submitForm() {
    this.formSubmitted = true;
    var name = this.formGroup.controls['name'].value;
    var description = this.formGroup.controls['description'].value;
    if ((name as string).length !== 0 && (description as string).length !== 0) {
      this._loader = this.loader.loader;
      this.createAgentRole(name, description);
    } else {
      this.loginFailureMsg = "Les deux champs sont requis";
    }
  }

 
}


