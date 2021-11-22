import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  api = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.api);
  }

  getEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.api}/${id}`);
  }

  addNewEmployee(employee: IEmployee): Observable<number> {
    return this.http.post<number>(this.api, employee);
  }

  editEmployee(id: number, employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.api}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<number> {
    return this.http.delete<number>(`${this.api}/${id}`);
  }
}
