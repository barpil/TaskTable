import {Component, Inject, inject, OnInit} from '@angular/core';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {InvitationService} from '../../../../services/invitation-service';

@Component({
  selector: 'app-team-invitation-dialog',
  imports: [],
  templateUrl: './team-invitation-dialog.html',
  styleUrl: './team-invitation-dialog.css'
})
export class TeamInvitationDialog implements OnInit{

  private readonly invitationService = inject(InvitationService);
  private readonly teamId: number;
  protected invitationCode: string = "";
  protected invitationLink: string = "";
  private baseUrl!: string;
  constructor(@Inject(DIALOG_DATA) data: {teamId: number}) {
    this.teamId = data.teamId;
    this.baseUrl = `${window.location.protocol}//${window.location.host}`;
  }


  ngOnInit(){
    this.invitationService.createTeamInvitation(this.teamId)
      .then(code => {
        this.invitationCode = code
        if(this.invitationCode === "") {
          this.invitationLink = "Failed to generate invitation code.";
        } else {
          this.invitationLink = this.baseUrl + "/invite/" + this.invitationCode;
        }
      })
      .catch(() => this.invitationCode = "")


  }
}
