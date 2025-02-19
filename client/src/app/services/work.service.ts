import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../models/work';
import { routeNames } from '../constants/route-names';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private baseUrl = import.meta.env.NG_APP_BASE_API_URL + routeNames.works;
  constructor(private client: HttpClient) {}

  getAll(): Observable<Work[]> {
    return this.client.get<Work[]>(this.baseUrl);
  }

  getByid(id: string) {
    return this.client.get<Work>(this.baseUrl + `/${id}`);
  }

  create(newWork: Work): Observable<Work> {
    return this.client.post<Work>(this.baseUrl, newWork);
  }

  edit(work: Work) {
    return this.client.patch<Work>(this.baseUrl + `/${work._id}`, work);
  }

  delete(id: string) {
    return this.client.delete<Work>(this.baseUrl + `/${id}`);
  }
}
