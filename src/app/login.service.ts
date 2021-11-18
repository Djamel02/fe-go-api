import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'


interface loginDTO {
  username: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Login method
  login(data:loginDTO) : Observable<string> {
    return this.http.post<string>('http://127.0.0.1:3000/login',data)
  }
}
