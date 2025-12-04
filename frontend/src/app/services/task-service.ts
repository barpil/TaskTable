import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, shareReplay} from 'rxjs';
import {Tasks} from './data/task';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Tasks | null>(null)
  get tasks$(): Observable<Tasks | null>{
    return this.tasksSubject.asObservable();
  }


  constructor(private readonly http: HttpClient) {}

  loadTasks(projectId: number){
    this.http.get<Tasks>(environment.apiUrl+'/tasks/'+projectId, {withCredentials: true})
      .subscribe(data => this.tasksSubject.next(data));
  }

  public changeTaskState(taskId: number, state: 'TO_DO' | 'IN_PROGRESS' | 'DONE'){
    return this.http.put(environment.apiUrl+'/tasks/'+taskId+'/state', {state: state}, {withCredentials: true})
  }
}
