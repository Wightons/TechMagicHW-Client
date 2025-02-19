import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkType } from '../models/work-type';
import { routeNames } from '../constants/route-names';

@Injectable({
  providedIn: 'root',
})
export class WorkTypeService {
  private baseUrl = import.meta.env.NG_APP_BASE_API_URL + routeNames.workTypes;
  constructor(private client: HttpClient) {}

  getAll(): Observable<WorkType[]> {
    return this.client.get<WorkType[]>(this.baseUrl);
  }

  create(newWorkType: WorkType) {
    return this.client.post<WorkType>(this.baseUrl, newWorkType);
  }

  edit(type: WorkType) {
    return this.client.patch<WorkType>(this.baseUrl + `/${type._id}`, type);
  }

  delete(id: string) {
    return this.client.delete<WorkType>(this.baseUrl + `/${id}`);
  }
}
