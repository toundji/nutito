import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints, rest } from "./rest-configs";
import { OperationType } from '../models/operation-type.model';

@Injectable({
  providedIn: 'root',
})
export class OperationTypeService {

  constructor(private http: HttpClient) {}

  create(newOperationType: OperationType) {
    var payload = JSON.stringify(newOperationType);
    return this.http.post<any>(endpoints.operationTypesCreateUrl,
      payload, {
        headers: rest.authHeaders
      })
  }

  getAll() {
    return this.http.get<OperationType[]>(
      endpoints.operationTypesUrl,
      { headers: rest.authHeaders }
    )
  }

  delete(operationType: OperationType) {
    return this.http.delete<any>(
      `${endpoints.operationTypesUrl}/delete/${operationType.id}`,
      { headers: rest.authHeaders }
    )
  }

}
