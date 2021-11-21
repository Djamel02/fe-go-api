import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';

interface loginDTO {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Login method
  login(data: loginDTO): Observable<string> {
    return this.http.post<string>('http://127.0.0.1:3000/login', data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    let decoded;
    if (token) {
      decoded = jwt.default<{ exp: number }>(token);
    }
    return !!token && new Date(Number(decoded?.exp) * 1000) > new Date();
  }
}
