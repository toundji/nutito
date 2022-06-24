<<<<<<< HEAD
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

=======
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgentRoleService{
    constructor(private httpClient: HttpClient){}

    createAgentRole(name: string, description:string):Observable<any>{
      var data={
        'name': name,
        "description": description
      };
      console.log(data);
      
      var payload= JSON.stringify(data);
      var url= environment.BASE_URL+"/agent-roles/create";
      return this.httpClient.post<any>(
        url,
        payload,{
          headers: new HttpHeaders({
           "Content-Type": "application/json"
          })
        }
        )
    };

    updateAgentRole(name: string, description:string, id: number):Observable<any>{
      var data={
        'name': name,
        "description": description,
        "id": id
      };
      var payload= JSON.stringify(data);
      var url= environment.BASE_URL+"/agent-roles/update";
      return this.httpClient.post<any>(
        url,
        payload,{
          headers: new HttpHeaders({
           "Content-Type": "application/json"
          })
        }
        )
    };
>>>>>>> e703b48d596166d921a128358fb14bb853494d94
}
