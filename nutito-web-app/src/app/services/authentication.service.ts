import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    var url = environment.BASE_URL + "/users/auth/signin";
    return this.http.post<any>(url, payload, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  resetPassword(email: string, old_password: string, new_password: string): Observable<any> {
    var data = {
      "email": email,
      "old_password": old_password,
      "new_password": new_password
    };
    var payload = JSON.stringify(data);
    var url = environment.BASE_URL + "auth/password/reset";
    return this.http.post<any>(url, payload, {
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
