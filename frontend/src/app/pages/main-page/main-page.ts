import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LogoutBtn} from '../../common-components/logout-btn/logout-btn';
import {TeamList} from './team-list/team-list';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';
import {UserInfo} from '../../services/user-service';

@Component({
  selector: 'app-main-page',
  imports: [
    LogoutBtn,
    TeamList,
    ButtonPanel,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage implements OnInit{
    private readonly activatedRoute = inject(ActivatedRoute);
    userInfo!: UserInfo;
    ngOnInit(){
      this.userInfo = this.activatedRoute.snapshot.data['userInfo'];
    }
}
