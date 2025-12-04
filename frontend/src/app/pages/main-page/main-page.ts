import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LogoutBtn} from '../../common-components/logout-btn/logout-btn';
import {TeamList} from './team-list/team-list';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';
import {UserInfo} from '../../services/user-service';
import {CreateTeamDialog} from './create-team-dialog/create-team-dialog';
import {Dialog} from '@angular/cdk/dialog';

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
    private readonly dialog = inject(Dialog);
    private readonly activatedRoute = inject(ActivatedRoute);
    @ViewChild('teamList')
    readonly teamListRef!: TeamList;
    userInfo!: UserInfo;
    ngOnInit(){
      this.userInfo = this.activatedRoute.snapshot.data['userInfo'];
    }

  protected openCreateTeamModal() {
      const dialogRef = this.dialog.open(CreateTeamDialog);
      dialogRef.closed.subscribe(() => {
        this.teamListRef.refreshTeams()
      });
  }
}
