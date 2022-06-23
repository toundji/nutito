import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoints } from './rest-configs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    var data = {
      "username": email,
      "password": password
    };
    var payload = JSON.stringify(data);
    return this.http.post<any>(endpoints.loginUrl, payload, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  resetPassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    var data = {
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    };
    var payload = JSON.stringify(data);
    return this.http.post<any>(endpoints.passwordResetUrl, payload, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}

export class LoginSuccessResponse {
  constructor(
    public success?: string,
    public statusCode?: number,
    public message?: string,
    public token?: string
  ) { }
}
