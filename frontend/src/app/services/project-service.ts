import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from './data/project';
import {User} from './data/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectSubject = new BehaviorSubject<Project[] | null>(null);
  get projects$(): Observable<Project[] | null>{
    return this.projectSubject.asObservable();
  }

  loadProjects(teamId: number){
    this.http.get<Project[]>(environment.apiUrl+'/projects/'+teamId, {withCredentials: true})
      .subscribe(data => this.projectSubject.next(data));
  }

  getUsersInProject(projectId: number): User[]{
    return []
  }

  async createProject(teamId: number, projectName: string, description: string): Promise<boolean> {
    const request: CreateProjectRequest = {team_id: teamId, project_name: projectName, description: description};
    try{
      const response = await firstValueFrom(this.http.post(environment.apiUrl+'/projects', request, {withCredentials: true, observe: "response"}));
      return response.ok;
    }catch(error){
      return false;
    }
  }

  async deleteProject(projectId: number): Promise<boolean> {
    try{
      const response = await firstValueFrom(this.http.delete(environment.apiUrl+'/projects/'+projectId, {withCredentials: true, observe: "response"}));
      return response.ok;
    }catch(error){
      return false;
    }
  }



  constructor(private readonly http: HttpClient) {
  }



}

interface CreateProjectRequest{
  team_id: number;
  project_name: string;
  description: string;
}


