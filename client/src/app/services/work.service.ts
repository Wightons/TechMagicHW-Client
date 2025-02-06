import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../models/work';
import { routeNames } from '../constants/route-names';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private baseUrl = import.meta.env.NG_APP_BASE_API_URL;
  constructor(private client: HttpClient) {}

  getAll(): Observable<Work[]> {
    return this.client.get<Work[]>(this.baseUrl + routeNames.works);
  }

  getByid(id: string) {
    return this.client.get<Work>(this.baseUrl + routeNames.works);
  }
}
