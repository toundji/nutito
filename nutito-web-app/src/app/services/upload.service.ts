import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints, rest } from './rest-configs';


@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private http: HttpClient) {}

  create(file: any, userId: number) {
    console.log(file)
    let upload = new FormData()
    upload.append("file", file)
    return this.http.post<any>(`${endpoints.filesUrl}/${userId}`, upload, {
      headers: {
        // "content-type": "multipart/form-data",
        "authorization": rest.authHeaders.Authorization
      }
    })
  }

}