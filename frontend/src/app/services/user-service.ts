import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, shareReplay} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedUserCache$?: Observable<Record<string, string>>;
  constructor(private readonly http: HttpClient) {}


  getLoggedUserInfo(reload = false): Observable<Record<string, string>>{
    if(!this.loggedUserCache$ || reload){
      this.loggedUserCache$ = this.http.get<Record<string, string>>(environment.apiUrl+'/auth/whoami', {withCredentials: true})
        .pipe(
          shareReplay({bufferSize: 1, refCount: true}),
          catchError(err => {
            console.error('Failed to get logged user data', err);
            return of();
          })
        );
    }
    return this.loggedUserCache$;
  }


}
