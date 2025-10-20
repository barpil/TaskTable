import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'logout-btn',
  imports: [],
  templateUrl: './logout-btn.html',
  styleUrl: './logout-btn.css'
})
export class LogoutBtn {
  private readonly http: HttpClient;
  private readonly router: Router;
  constructor(router: Router, http: HttpClient) {
    this.router=router;
    this.http=http;
  }

  logoutUser(){
    this.http.post('http://localhost:8080/api/auth/logout', {}, {withCredentials: true}).subscribe({
      next: () => {
        this.router.navigate([''])
      },
      error: (error) => {
        globalThis.alert('Błąd wylogowywania: '+ (error.body?.toString() ?? 'empty body')+' status: '+error.status)
      }
    });
  }
}
