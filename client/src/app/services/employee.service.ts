import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { routeNames } from '../constants/route-names';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = import.meta.env.NG_APP_BASE_API_URL + routeNames.employees;
  constructor(private client: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.client.get<Employee[]>(this.baseUrl);
  }

  create(newEmp: Employee) {
    return this.client.post<Employee>(this.baseUrl, newEmp);
  }

  edit(emp: Employee) {
    return this.client.patch<Employee>(this.baseUrl + `/${emp._id}`, emp);
  }

  delete(id: string) {
    return this.client.delete<Employee>(this.baseUrl + `/${id}`);
  }
}
