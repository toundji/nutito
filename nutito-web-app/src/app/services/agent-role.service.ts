import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AgentRole } from "../models/agent-role.model";
import { endpoints, rest } from "./rest-configs";

@Injectable({
  providedIn: 'root',
})
export class AgentRoleService {

  constructor(private http: HttpClient) {}

  create(newAgentRole: AgentRole) {
    var payload = JSON.stringify(newAgentRole);
    return this.http.post<any>(endpoints.agentRoleCreateUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<AgentRole[]>(endpoints.agentRolesUrl, { headers: rest.authHeaders })
  }

  delete(agentRole: AgentRole) {
    return this.http.delete<any>(
      `${endpoints.agentRolesUrl}/${agentRole.id}`,
      { headers: rest.authHeaders }
    )
  }

}
