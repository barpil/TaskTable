import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Team, UsersTeams} from '../../../services/data/team';
import {DatePipe} from '@angular/common';
import {Dialog} from '@angular/cdk/dialog';
import {TeamDetails} from '../team-details/team-details';

@Component({
  selector: 'team-tile',
  imports: [
    DatePipe
  ],
  templateUrl: './team-tile.html',
  styleUrls: ['./team-tile.css', '../../../common-components/common-styles.css']
})
export class TeamTile {
  @Input() teamAndJoinDate!: UsersTeams;
  @Output() teamClicked = new EventEmitter<Team>();
  private readonly dialog = inject(Dialog);
  onClickedTile(){
    this.teamClicked.emit(this.teamAndJoinDate.team);
  }


  protected openTeamDetailsModal() {
      this.dialog.open(TeamDetails, {
        data: { team: this.teamAndJoinDate.team}
      });
  }

}
