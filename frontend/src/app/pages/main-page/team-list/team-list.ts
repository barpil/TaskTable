import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team-service';
import {Team, UsersTeams} from '../../../services/data/team';
import {Observable} from 'rxjs';
import {TeamTile} from '../team-tile/team-tile';
import {Router} from '@angular/router';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {SortCriteria, TeamSortDialog} from '../team-sort-dialog/team-sort-dialog';
import {Dialog} from '@angular/cdk/dialog';

@Component({
  selector: 'team-list',
  imports: [
    TeamTile,
    LoadingAnimation
  ],
  templateUrl: './team-list.html',
  styleUrls: ['./team-list.css', '../../../common-components/common-styles.css']
})
export class TeamList implements OnInit{
  joinedTeams: UsersTeams[] | undefined;
  currentSort: SortCriteria = 'name_asc'; // Pamiętamy obecne sortowanie

  constructor(
    private readonly teamService: TeamService,
    private readonly router: Router,
    private readonly dialog: Dialog // Wstrzykujemy Dialog
  ) {}

  ngOnInit(){
    this.teamService.getTeams().subscribe(data =>{
      this.joinedTeams = data;
      this.sortTeams(this.currentSort); // Sortujemy od razu po pobraniu (opcjonalne)
    });
  }

  openSortDialog() {
    // Otwieramy dialog
    const dialogRef = this.dialog.open<SortCriteria>(TeamSortDialog, {
      minWidth: '300px',
      data: { currentSort: this.currentSort } // Przekazujemy obecny stan
    });

    // Obsługujemy wynik po zamknięciu
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.currentSort = result;
        this.sortTeams(result);
      }
    });
  }

  // Główna logika sortowania
  private sortTeams(criteria: SortCriteria) {
    if (!this.joinedTeams) return;

    // Sortujemy "in place" - Angular wykryje zmianę w tablicy
    this.joinedTeams.sort((a, b) => {
      switch (criteria) {
        case 'name_asc':
          return a.team.name.localeCompare(b.team.name);
        case 'name_desc':
          return b.team.name.localeCompare(a.team.name);
        case 'date_asc':
          return new Date(a.join_date).getTime() - new Date(b.join_date).getTime();
        case 'date_desc':
          return new Date(b.join_date).getTime() - new Date(a.join_date).getTime();
        default:
          return 0;
      }
    });
  }

  handleClickedTeam($event: Team) {
    this.router.navigate(['/teams', $event.team_id]);
  }
}
