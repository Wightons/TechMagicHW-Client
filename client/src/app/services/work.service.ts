import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../models/work';
import { routeNames } from '../constants/route-names';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.client.post<Work>(this.baseUrl, newWork).pipe(
      catchError((error) => {
        console.error('Error creating work:', error);
        return throwError(
          () => new Error('Failed to create work. Please try again later.')
        );
      })
    );
  }
}
