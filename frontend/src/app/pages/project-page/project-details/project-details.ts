import {Component, inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Project} from '../../../services/data/project';
import {UserNameEmail} from '../../../services/data/user';

@Component({
  selector: 'project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails {
  public data: { project: Project} = inject(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<string>);
  protected assignedUsers: UserNameEmail[] = [];

  get ownerUsername(): string{
    return this.data.project.owner.name;
  }

  close(): void {
    this.dialogRef.close();
  }

}
