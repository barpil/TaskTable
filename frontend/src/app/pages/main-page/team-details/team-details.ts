import {Component, inject, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Team} from '../../../services/data/team';
import {TeamService} from '../../../services/team-service';
import {map, Observable} from 'rxjs';
import {UserNameEmail} from '../../../services/data/user';
import {UserService} from '../../../services/user-service';
import {take} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {TeamInvitationDialog} from './team-invitation-dialog/team-invitation-dialog';

@Component({
  selector: 'app-team-details',
  imports: [
    AsyncPipe
  ],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css'
})
export class TeamDetails implements OnInit{
  public data: { team: Team} = inject(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<string>);
  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  private readonly dialog = inject(Dialog);
  protected assignedUsers: UserNameEmail[] = [];

  get ownerUsername(): Observable<string>{
    return this.userService.getLoggedUserInfo(false).pipe(
      take(1),
      map(userInfo => userInfo.username));
  }


  get assignedUsersUsernames(): string {
    return this.assignedUsers.length !== 0 ? this.assignedUsers.map(user => user.username).join(', '): 'Brak członków';
  }

  ngOnInit() {
    this.teamService.getUsersInTeam(this.data.team.team_id).subscribe(users => {
      this.assignedUsers = users.sort((a, b) => a.username.localeCompare(b.username));
    });
  }

  isTeamOwner(): Observable<boolean>{
    return this.userService.getLoggedUserInfo(false).pipe(
      take(1),
      map(userInfo => {
        return this.data.team.owner === userInfo.email;
      })
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  protected openTeamInvitationModal() {
    this.dialog.open(TeamInvitationDialog, {
      data: {teamId: this.data.team.team_id}
    });
  }
}
