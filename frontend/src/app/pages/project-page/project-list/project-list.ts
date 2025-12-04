import {Component, Input, OnInit} from '@angular/core';

import {ProjectService} from '../../../services/project-service';
import {ProjectTile} from '../project-tile/project-tile';
import {Project} from '../../../services/data/project';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {Router} from '@angular/router';

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

  projects: Project[] | null = null;
  constructor(private readonly projectService: ProjectService, private readonly router: Router) {
  }

  ngOnInit(){
    this.projectService.loadProjects(this.teamId);
    this.projectService.projects$.subscribe(data => {
      this.projects = data;
    })
  }

  handleClickedProject($event: Project){
    this.router.navigate(['/teams', this.teamId,'projects', $event.id]);
  }
}
