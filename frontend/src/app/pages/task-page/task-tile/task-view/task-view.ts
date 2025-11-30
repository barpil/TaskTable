import {Component, inject} from '@angular/core';
import {Task} from '../../../../services/data/task';
import {Dialog, DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {EditTaskForm} from '../../edit-task-form/edit-task-form';

@Component({
  selector: 'app-task-view',
  imports: [],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css'
})
export class TaskView {
  public data: { projectId: number, task: Task } = inject(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<string>);
  private readonly dialog = inject(Dialog);

  get assignedUsersUsernames(): string {
    return this.data.task.assigned_users.map(user => user.username).join(', ') || 'Nikt nieprzypisany';
  }

  formatStatus(status: string): string {
    switch(status) {
      case 'todo': return 'Do zrobienia';
      case 'in-progress': return 'W trakcie';
      case 'done': return 'Zakończone';
      default: return status;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openTaskEditModal(): void {
    this.close();
    this.dialog.open(EditTaskForm, {
      data: { projectId: this.data.projectId, task: this.data.task }
    });
  }
}
