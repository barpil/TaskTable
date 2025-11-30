import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Team, UsersTeams} from '../../../services/data/team';
import {DatePipe} from '@angular/common';

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

  onClickedTile(){
    this.teamClicked.emit(this.teamAndJoinDate.team);
  }


}
