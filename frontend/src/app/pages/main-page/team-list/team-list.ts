import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team-service';
import {Team, UsersTeams} from '../../../services/data/team';
import {Observable} from 'rxjs';
import {TeamTile} from '../team-tile/team-tile';
import {Router} from '@angular/router';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';

@Component({
  selector: 'team-list',
  imports: [
    TeamTile,
    LoadingAnimation
  ],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css'
})
export class TeamList implements OnInit{
  joinedTeams: UsersTeams[] | undefined;
  constructor(private readonly teamService: TeamService, private readonly router: Router) {
  }

  ngOnInit(){
    this.teamService.getTeams().subscribe(data =>{
      this.joinedTeams = data;
    });
  }
  //BĘDĘ MUSIAŁ ZABEZPIECZYĆ ŻEBY JEŻELI UŻYTKOWNIK NIE JEST W TEAMIE TO NIE MOGL PRZEJSC NA STRONE TEAMU

  handleClickedTeam($event: Team) {
    this.router.navigate(['/teams', $event.team_id]);
  }
}
