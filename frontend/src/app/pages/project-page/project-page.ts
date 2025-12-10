import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectList} from './project-list/project-list';
import {ReturnBtn} from '../../common-components/return-btn/return-btn';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';
import {LogoutBtn} from '../../common-components/logout-btn/logout-btn';
import {Dialog} from '@angular/cdk/dialog';
import {CreateProjectDialog} from './create-project-dialog/create-project-dialog';
import {TeamService} from '../../services/team-service';
import {Team} from '../../services/data/team';
import {find, map} from 'rxjs';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-project-page',
  imports: [
    ProjectList,
    ReturnBtn,
    ButtonPanel,
    LogoutBtn
  ],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css'
})
export class ProjectPage implements OnInit{
  teamId!: number;
  team: Team | null = null;
  isOwner: boolean = false;
  dialog = inject(Dialog)
  @ViewChild('projectList')
  readonly projectListRef!: ProjectList;
  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get("teamId");
      if(id) this.teamId = +id;
      this.teamService.getTeams().pipe(map(teams => teams.find(team => team.team.team_id === this.teamId))).subscribe(result =>{
        this.team = result?.team ?? null;
        this.userService.getLoggedUserInfo(false).subscribe(userInfo => {this.isOwner = userInfo.email === this.team?.owner})
      });
    })
  }

  protected openCreateProjectModal() {
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      data: {teamId: this.teamId}
    });
    dialogRef.closed.subscribe(() => {
      this.projectListRef.refreshProjects();
    });
  }


}
