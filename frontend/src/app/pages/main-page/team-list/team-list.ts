import {Component, inject, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team-service';
import {Team, UsersTeams} from '../../../services/data/team';
import {TeamTile} from '../team-tile/team-tile';
import {Router} from '@angular/router';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {SortCriteria, TeamSortDialog} from '../team-sort-dialog/team-sort-dialog';
import {Dialog} from '@angular/cdk/dialog';
import {UserService} from '../../../services/user-service';
import {ConfirmationDialog} from '../../../common-components/confirmation-dialog/confirmation-dialog';

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

  ownedTeams: UsersTeams[] = []
  memberTeams: UsersTeams[] = []

  currentSort: SortCriteria = 'name_asc';

  userService = inject(UserService);

  constructor(
    private readonly teamService: TeamService,
    private readonly router: Router,
    private readonly dialog: Dialog
  ) {}

  ngOnInit(){
    this.refreshTeams();
  }

  refreshTeams(){
    this.teamService.getTeams().subscribe(data =>{
      this.joinedTeams = data;
      this.sortTeams(this.currentSort);
      this.userService.getLoggedUserInfo(false).subscribe(userInfo => {
        const userEmail = userInfo.email;
        this.ownedTeams = []
        this.memberTeams = []
        this.joinedTeams?.forEach(usersTeam => {
          if(usersTeam.team.owner === userEmail){
            this.ownedTeams.push(usersTeam);
          }else{
            this.memberTeams.push(usersTeam);
          }
        });

      })
    });
  }

  openSortDialog() {
    const dialogRef = this.dialog.open<SortCriteria>(TeamSortDialog, {
      minWidth: '300px',
      data: { currentSort: this.currentSort } // Przekazujemy obecny stan
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.currentSort = result;
        this.sortTeams(result);
      }
    });
  }

  private sortTeams(criteria: SortCriteria) {
    if (!this.joinedTeams) return;

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


  deleteTeam(team: UsersTeams){
    const dialogRef = this.dialog.open(ConfirmationDialog,
      {data: {
        title: 'Potwierdzenie',
          text: `Czy na pewno chcesz usunąć zespół "${team.team.name}"?`
        }});
    dialogRef.closed.subscribe(async result => {
      if(result){
        const teamDeleted = await this.teamService.deleteTeam(team.team.team_id);
        if(teamDeleted) this.refreshTeams();
      }
    })
  }
}
