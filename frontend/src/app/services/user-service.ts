import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: Record<string, string> | null = null;
  private isUserLogged = false;
  constructor(private readonly http: HttpClient) {}


  private fetchUserInfo(): Observable<Record<string, string> | null>{
    return this.http.get<Record<string, string>>(environment.apiUrl+'/auth/whoami', {withCredentials: true}).pipe(
      tap(response => {
        this.userInfo = response;
        this.isUserLogged = true;
      }),
      catchError(err => {
        this.isUserLogged = false;
        this.userInfo = null;
        return of(null);
      })
    );
  }

  getLoggedUserInfo(): Observable<Record<string, string> | null>{
    //TA TUTAJ "PAMIEC" NIE DZIALA BO SIE ZAWSZE RESETUJE PO PRZELADOWANIU STRONY
    if(this.isUserLogged) return of(this.userInfo);
    else{
      //ZAWSZE SIE TEN ELSE WYWOLUJE. POCZYTAJ JAK TO ZROBIC Z localStorage+BehavioralSubject
      return this.fetchUserInfo();
    }
  }
}
