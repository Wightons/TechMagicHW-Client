import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkType } from '../models/work-type';
import { routeNames } from '../constants/route-names';

@Injectable({
  providedIn: 'root',
})
export class WorkTypeService {
  private baseUrl = import.meta.env.NG_APP_BASE_API_URL;
  constructor(private client: HttpClient) {}

  getAll(): Observable<WorkType[]> {
    return this.client.get<WorkType[]>(this.baseUrl + routeNames.workTypes);
  }
}
