import {Component, Input, OnInit} from '@angular/core';
import {UsersTeams} from '../../../services/data/team';
import {TeamService} from '../../../services/team-service';
import {Router} from '@angular/router';

import {ProjectService} from '../../../services/project-service';
import {TeamTile} from '../../main-page/team-tile/team-tile';
import {ProjectTile} from '../project-tile/project-tile';
import {Project} from '../../../services/data/project';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';

@Component({
  selector: 'project-list',
  imports: [
    ProjectTile,
    LoadingAnimation
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList implements OnInit{
  @Input() teamId!: number;

  projects: Project[] | undefined;
  constructor(private readonly projectService: ProjectService) {
  }

  ngOnInit(){
    this.projectService.getProjectsForTeam(this.teamId, true).subscribe(data =>{
      this.projects = data;
    });
  }
}
