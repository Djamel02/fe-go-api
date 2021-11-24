import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { IUser, loginDTO } from '../models/user.interface';
import { Res } from '../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  api: string = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {}

  // Login method
  login(data: loginDTO): Observable<Res> {
    return this.http.post<Res>(`${this.api}/login`, data);
  }

  // Signup method
  signup(user: IUser): Observable<Res> {
    return this.http.post<Res>(`${this.api}/register`, user);
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
