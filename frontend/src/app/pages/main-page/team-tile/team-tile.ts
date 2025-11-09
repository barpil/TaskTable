import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Team, UsersTeams} from '../../../services/data/team';
import {TeamService} from '../../../services/team-service';

@Component({
  selector: 'team-tile',
  imports: [],
  templateUrl: './team-tile.html',
  styleUrl: './team-tile.css'
})
export class TeamTile {
  @Input() teamAndJoinDate!: UsersTeams;
  @Output() teamClicked = new EventEmitter<Team>();

  onClickedTile(){
    this.teamClicked.emit(this.teamAndJoinDate.team);
  }
}
