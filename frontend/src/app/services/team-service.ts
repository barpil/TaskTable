import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, shareReplay} from 'rxjs';
import {GetTeamsResponse, Team, UsersTeams} from './data/team';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsCache$?: Observable<UsersTeams[]>;

  constructor(private readonly http: HttpClient) {
  }

  getTeams(reload = true): Observable<UsersTeams[]>{
    if(!this.teamsCache$ || reload){
      this.teamsCache$ = this.http.get<GetTeamsResponse>(environment.apiUrl+'/teams', {withCredentials: true})
        .pipe(
          map(response => response.teams),
          shareReplay({bufferSize: 1, refCount: true}),
          catchError(err => {
            console.error('Failed to load teams', err);
            return of([]);
          })
        );
    }
    return this.teamsCache$;
  }



}
