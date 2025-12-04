import {Component, inject} from '@angular/core';
import {RedirectCommand, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user-service';
import {catchError, map, Observable, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'logout-btn',
  imports: [
    AsyncPipe
  ],
  templateUrl: './logout-btn.html',
  styleUrl: './logout-btn.css'
})
export class LogoutBtn {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  userName$: Observable<string>;

  constructor() {
    this.userName$ = this.userService.getLoggedUserInfo().pipe(
      map(userInfo => {
        return userInfo ? userInfo.username : "error";
      }),
      catchError(() => of("error"))
    );
  }

  logoutUser(){
    this.http.post(environment.apiUrl+'/auth/logout', {}, {withCredentials: true}).subscribe({
      next: () => {
        this.router.navigate([''])
      },
      error: (error) => {
        globalThis.alert('Błąd wylogowywania: '+ (error.body?.toString() ?? 'empty body')+' status: '+error.status)
      }
    });
  }
}
