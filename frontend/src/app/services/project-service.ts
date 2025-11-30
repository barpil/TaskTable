import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
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



  constructor(private readonly http: HttpClient) {
  }


}


