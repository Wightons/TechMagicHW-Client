import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../models/work';
import { routeNames } from '../constants/route-names';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private client: HttpClient) {}

  getAll(): Observable<Work[]> {
    let baseUrl = import.meta.env.NG_APP_BASE_API_URL;
    return this.client.get<Work[]>(baseUrl + routeNames.works);
  }
}
