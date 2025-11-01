import {Component, inject, input} from '@angular/core';
import {LogoutBtn} from '../common-components/logout-btn/logout-btn';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [
    LogoutBtn
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {
    private readonly activatedRoute = inject(ActivatedRoute);
    userInfo!: Record<string, string>;
    ngOnInit(){
      this.userInfo = this.activatedRoute.snapshot.data['userInfo'];
    }
}
