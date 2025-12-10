import {Component, inject, Input, OnInit} from '@angular/core';

import {ProjectService} from '../../../services/project-service';
import {ProjectTile} from '../project-tile/project-tile';
import {Project} from '../../../services/data/project';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {Router} from '@angular/router';
import {UsersTeams} from '../../../services/data/team';
import {ConfirmationDialog} from '../../../common-components/confirmation-dialog/confirmation-dialog';
import {Dialog} from '@angular/cdk/dialog';
import {UserService} from '../../../services/user-service';
import {ProjectSortDialog, SortCriteria} from '../project-sort-dialog/project-sort-dialog';
import {TeamSortDialog} from '../../main-page/team-sort-dialog/team-sort-dialog';


@Component({
  selector: 'project-list',
  imports: [
    ProjectTile,
    LoadingAnimation
  ],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css', '../../../common-components/common-styles.css']
})
export class ProjectList implements OnInit{
  @Input() teamId!: number;

  loggedUserEmail: string = ""
  private currentSort: SortCriteria = 'name_asc';
  private dialog = inject(Dialog);
  private userService = inject(UserService);

  projects: Project[] | null = null;
  ownedProjects: Project[] = [];
  memberProjects: Project[] = [];
  constructor(private readonly projectService: ProjectService, private readonly router: Router) {
  }

  ngOnInit(){
    this.userService.getLoggedUserInfo(false).subscribe(userInfo => {
      this.loggedUserEmail = userInfo.email;
    });
    this.refreshProjects();
  }

  refreshProjects(){
    this.projectService.loadProjects(this.teamId);

    this.projectService.projects$.subscribe(data => {
      this.projects = data;
      this.sortProjects(this.currentSort);
      this.userService.getLoggedUserInfo(false).subscribe(userInfo =>{
        const userEmail = userInfo.email;
        this.ownedProjects = [];
        this.memberProjects = [];
        this.projects?.forEach(project =>{
          if(project.owner.email === userEmail){
            this.ownedProjects.push(project);
          }else{
            this.memberProjects.push(project);
          }
        });
      })
    });
  }


  private sortProjects(criteria: SortCriteria) {
    if (!this.projects) return;
    this.projects.sort((a, b) => {
      switch (criteria) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }

  handleClickedProject($event: Project){
    this.router.navigate(['/teams', this.teamId,'projects', $event.id]);
  }

  deleteProject(project: Project){
    const dialogRef = this.dialog.open(ConfirmationDialog,
      {data: {
          title: 'Potwierdzenie',
          text: `Czy na pewno chcesz usunąć projekt "${project.name}"?`
        }});
    dialogRef.closed.subscribe(async result => {
      if(result){
        const projectDeleted = await this.projectService.deleteProject(project.id);
        if(projectDeleted) this.refreshProjects();
      }
    })
  }

  openSortDialog() {
    const dialogRef = this.dialog.open<SortCriteria>(ProjectSortDialog, {
      minWidth: '300px',
      data: { currentSort: this.currentSort }
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.currentSort = result;
        this.sortProjects(result);
        this.refreshProjects();
      }
    });
  }

}
