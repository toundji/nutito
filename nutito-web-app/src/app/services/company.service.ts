import { Company } from '../pages/company/company.page';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: root,
})
export class CompanyService{
    constructor(private httpClient: HttpClient){}

    createAgentRole(name: string, description:string):Observable<any>{
      var data={
        'name': name,
        "description": description
      };
      var payload= JSON.stringify(data);
      var url= environment.BASE_URL+"/companies/create";
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
