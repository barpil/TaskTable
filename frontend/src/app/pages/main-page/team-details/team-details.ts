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
import {UserDDSelect} from '../../../common-components/user-ddselect/user-ddselect';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-team-details',
  imports: [
    AsyncPipe,
    UserDDSelect
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
  protected assignedUsersInForm: UserNameEmail[] = [];
  protected editingMembers: boolean = false;
  usersInProject: UserNameEmail[] = [];
  editUsersTaskForm: FormGroup;


  constructor(private readonly fb: FormBuilder) {
    this.editUsersTaskForm = this.fb.group({
      members: [this.assignedUsersInForm]
    })
  }

  get ownerUsername(): string{
    return this.data.team.owner
  }


  get assignedUsersUsernames(): string {
    return this.assignedUsers.length !== 0 ? this.assignedUsers.map(user => user.username).join(', '): 'Brak członków';
  }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers(){
    this.teamService.getUsersInTeam(this.data.team.team_id).subscribe(users => {
      this.assignedUsers = users.sort((a, b) => a.username.localeCompare(b.username))
        .filter(user => user.email !== this.data.team.owner);
      this.assignedUsersInForm = [...this.assignedUsers];
      this.editUsersTaskForm.get('members')?.setValue(this.assignedUsersInForm);
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

  protected turnOnEditingMembers(){
    this.editingMembers = true;
  }

  protected onEditUsersSubmit(){
    const currentMembers = this.assignedUsers.map(u => u.email).sort();
    const editedUsers: string[] = this.editUsersTaskForm.value.members.map((u: UserNameEmail) => u.email).sort();
    if(JSON.stringify(currentMembers)!==JSON.stringify(editedUsers)){
      const editedUsersSet = new Set(editedUsers);
      this.teamService.removeUsersFromTeam(currentMembers.filter(a => !editedUsersSet.has(a)), this.data.team.team_id)
        .then(result => {
          this.editingMembers = !result;
          this.refreshUsers();
        });
    }else{
      this.editingMembers = false;
    }

  }
}
