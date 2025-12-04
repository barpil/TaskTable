import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, map, Observable, of, shareReplay} from 'rxjs';
import {GetTeamsResponse, Team, UsersTeams} from './data/team';
import {environment} from '../../environments/environment';
import {UserNameEmail} from './data/user';

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

  getUsersInTeam(teamId: number): Observable<UserNameEmail[]>{
    const response = this.http.get<GetUsersInTeamResponse>(environment.apiUrl+'/teams/'+teamId+"/members", {withCredentials: true})
    return response.pipe(
      map(response => response.users),
      shareReplay({bufferSize: 1, refCount: true}),
      catchError(err => {
        console.error('Failed to load team members', err);
        return of([]);
      })
    );
  }

  async createTeam(teamName: string, description: string): Promise<boolean>{
    const request: CreateTeamRequest = {team_name: teamName, description: description};
    try{
      const response = await firstValueFrom(this.http.post(environment.apiUrl+'/teams', request, {withCredentials: true, observe: "response"}))
      return response.ok;
    }catch(error){
      return false;
    }
  }


  async deleteTeam(teamId: number): Promise<boolean>{
    try{
      const response = await firstValueFrom(this.http.delete(environment.apiUrl+'/teams/'+teamId, {withCredentials: true, observe: "response"}));
      return response.ok;
    }catch(error){
      return false;
    }
  }

}
interface CreateTeamRequest{
  team_name: string;
  description: string
}

interface GetUsersInTeamResponse{
  users: UserNameEmail[];
}

