import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {UsersTeams} from '../../../services/data/team';
import {Project} from '../../../services/data/project';
import {TeamDetails} from '../../main-page/team-details/team-details';
import {Dialog} from '@angular/cdk/dialog';
import {ProjectDetails} from '../project-details/project-details';

@Component({
  selector: 'project-tile',
  imports: [],
  templateUrl: './project-tile.html',
  styleUrls: ['./project-tile.css', '../../../common-components/common-styles.css']
})
export class ProjectTile {
  @Input() projectObject!: Project;
  @Output() projectClicked = new EventEmitter<Project>

  private readonly dialog = inject(Dialog);

  onClickedTile(){
    this.projectClicked.emit(this.projectObject);
  }

  protected openProjectDetailsModal() {
    this.dialog.open(ProjectDetails, {
      data: { project: this.projectObject}
    });
  }
}
