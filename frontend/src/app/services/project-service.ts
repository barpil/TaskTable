import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, shareReplay} from 'rxjs';
import {GetTeamsResponse, UsersTeams} from './data/team';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from './data/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectCache$?: Observable<Project[]>;

  constructor(private readonly http: HttpClient) {
  }

  getProjectsForTeam(teamId: number, reload = false): Observable<Project[]>{
    if(!this.projectCache$ || reload){
      this.projectCache$ = this.http.get<Project[]>(environment.apiUrl+'/projects/'+teamId, {withCredentials: true})
        .pipe(
          shareReplay({bufferSize: 1, refCount: true}),
          catchError(err => {
            console.error('Failed to load projects', err);
            return of([]);
          })
        );
    }
    return this.projectCache$;
  }
}
