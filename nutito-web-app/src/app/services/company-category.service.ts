import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AgentRole } from "../models/agent-role.model";
import { endpoints, rest } from "./rest-configs";
import { CompanyCategory } from '../models/company-category.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyCategoryService {

  constructor(private http: HttpClient) {}

  create(newCompanyCategory: CompanyCategory) {
    var payload = JSON.stringify(newCompanyCategory);
    return this.http.post<any>(endpoints.companyCategoriesCreateUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<CompanyCategory[]>(endpoints.companyCategoriesUrl, { headers: rest.authHeaders })
  }

  delete(companyCategory: CompanyCategory) {
    return this.http.delete<any>(
      `${endpoints.agentRolesUrl}/${companyCategory.id}`,
      { headers: rest.authHeaders }
    )
  }

}
