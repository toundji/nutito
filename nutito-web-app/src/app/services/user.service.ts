import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AgentRole } from "../models/agent-role.model";
import { endpoints, rest } from "./rest-configs";
import { CompanyCategory } from '../models/company-category.model';
import { Workfield } from "../models/workfield.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  create(newUser: User) {
    var payload = JSON.stringify(newUser);
    return this.http.post<any>(endpoints.registerUserUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<User[]>(endpoints.usersUrl, { headers: rest.authHeaders })
  }

  delete(user: User) {
    return this.http.delete<any>(
      `${endpoints.usersUrl}/delete/${user.id}`,
      { headers: rest.authHeaders }
    )
  }

}
