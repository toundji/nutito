import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LicenceService{
    constructor(private httpClient: HttpClient){}

    createLicence(numbermonth: number, paiementtype:string, companyid: number):Observable<any>{
      var data={
        'numbermonth': numbermonth,
        "paiementtype": paiementtype,
        "companyid": companyid
      };
      var payload= JSON.stringify(data);
      var url= environment.BASE_URL+"/licences/create";
      return this.httpClient.post<any>(
        url,
        payload,{
          headers: new HttpHeaders({
           "Content-Type": "application/json"
          })
        }
        )
    };

    updateAgentRole(numbermonth: string, paiementtype:string, id: number):Observable<any>{
      var data={
        'numbermonth': numbermonth,
        "paiementtype": paiementtype,
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
