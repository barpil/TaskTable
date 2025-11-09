import {Component, Input} from '@angular/core';
import {UsersTeams} from '../../../services/data/team';
import {Project} from '../../../services/data/project';

@Component({
  selector: 'project-tile',
  imports: [],
  templateUrl: './project-tile.html',
  styleUrl: './project-tile.css'
})
export class ProjectTile {
  @Input() projectObject!: Project;
}
