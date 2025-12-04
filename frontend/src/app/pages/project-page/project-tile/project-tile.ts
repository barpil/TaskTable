import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsersTeams} from '../../../services/data/team';
import {Project} from '../../../services/data/project';

@Component({
  selector: 'project-tile',
  imports: [],
  templateUrl: './project-tile.html',
  styleUrls: ['./project-tile.css', '../../../common-components/common-styles.css']
})
export class ProjectTile {
  @Input() projectObject!: Project;
  @Output() projectClicked = new EventEmitter<Project>

  onClickedTile(){
    this.projectClicked.emit(this.projectObject);
  }
}
