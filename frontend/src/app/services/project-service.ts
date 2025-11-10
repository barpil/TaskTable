import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, shareReplay} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from './data/project';

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



  constructor(private readonly http: HttpClient) {
  }


}
