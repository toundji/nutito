import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AgentRole } from "../models/agent-role.model";
import { endpoints, rest } from "./rest-configs";
import { CompanyCategory } from '../models/company-category.model';
import { Workfield } from "../models/workfield.model";

@Injectable({
  providedIn: 'root',
})
export class WorkfieldService {

  constructor(private http: HttpClient) {}

  create(newWorkfield: Workfield) {
    var payload = JSON.stringify(newWorkfield);
    return this.http.post<any>(endpoints.workfieldsCreateUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<Workfield[]>(endpoints.workfieldsUrl, { headers: rest.authHeaders })
  }

  delete(workfield: Workfield) {
    return this.http.delete<any>(
      `${endpoints.workfieldsUrl}/delete/${workfield.id}`,
      { headers: rest.authHeaders }
    )
  }

}
