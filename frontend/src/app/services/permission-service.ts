import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private readonly http: HttpClient) {}

  canAccessTeam(teamId: string): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/auth/access/team/${teamId}`, {observe: "response", withCredentials: true})
      .pipe(
        map(response => {return true}),
        catchError(() => {
          return of(false);
        })
      );
  }

  canAccessProject(projectId: string): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/auth/access/project/${projectId}`, {observe: "response", withCredentials: true})
      .pipe(
        map(response => {return true}),
        catchError(() => {
          return of(false);
        })
      );
  }
}
