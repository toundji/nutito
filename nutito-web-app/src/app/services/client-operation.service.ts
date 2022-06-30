import { ClientOperation } from './../models/client-operation.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AgentRole } from "../models/agent-role.model";
import { endpoints, rest } from "./rest-configs";

@Injectable({
  providedIn: 'root',
})
export class ClientOperationService {

  constructor(private http: HttpClient) {}

  create(newClientOperation: ClientOperation) {
    var payload = JSON.stringify(newClientOperation);
    return this.http.post<any>(endpoints.clientOperationUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<AgentRole[]>(endpoints.clientOperationUrl, { headers: rest.authHeaders })
  }

  delete(agentRole: AgentRole) {
    return this.http.delete<any>(
      `${endpoints.clientOperationUrl}/${agentRole.id}`,
      { headers: rest.authHeaders }
    )
  }

}
