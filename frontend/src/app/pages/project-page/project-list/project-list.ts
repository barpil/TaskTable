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

  private dialog = inject(Dialog);
  private userService = inject(UserService);

  projects: Project[] | null = null;
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
    })
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

}
