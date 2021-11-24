import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/employee.interface';
import { Res } from '../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  api = 'http://localhost:3000/employee';
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<Res> {
    return this.http.get<Res>(this.api, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getEmployeeById(id: number): Observable<Res> {
    return this.http.get<Res>(`${this.api}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  addNewEmployee(employee: FormData): Observable<Res> {
    return this.http.post<Res>(this.api, employee, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  editEmployee(id: number, employee: IEmployee): Observable<Res> {
    return this.http.put<Res>(`${this.api}/${id}`, employee, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  deleteEmployee(id: number): Observable<Res> {
    return this.http.delete<Res>(`${this.api}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
