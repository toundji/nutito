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
}
