import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints, rest } from "./rest-configs";


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  create(newCompany: any) {
    var payload = JSON.stringify(newCompany);
    return this.http.post<any>(endpoints.companiesCreateUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getByCustomerId(customerId: number) {
    return this.http.get<any>(
      `endpoints.companiesUrl/customer/${customerId}`,
      { headers: rest.authHeaders }
    )
  }

}
