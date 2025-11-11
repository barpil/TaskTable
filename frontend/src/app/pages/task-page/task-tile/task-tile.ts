import {Component, inject, Input, OnInit} from '@angular/core';
import {Task} from '../../../services/data/task';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../../services/task-service';
import {Dialog} from '@angular/cdk/dialog';
import {EditTaskForm} from '../edit-task-form/edit-task-form';

@Component({
  selector: 'task-tile',
  imports: [],
  templateUrl: './task-tile.html',
  styleUrl: './task-tile.css'
})
export class TaskTile implements OnInit{
  @Input() taskObject!: Task;
  taskService: TaskService = inject(TaskService);
  projectId!: number;
  private dialog = inject(Dialog);
  constructor(private readonly route: ActivatedRoute) {}

  get assignedUsersUsernames(): string{
    return this.taskObject.assigned_users.map(user => user.username).join(', ');
  }

  protected onStateChange(event: Event) {
    const selectedState = (event.target as HTMLSelectElement).value.toUpperCase().replace(' ', '_') as 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    this.taskService.changeTaskState(this.taskObject.id, selectedState).subscribe({
      next: () => {
        this.taskService.loadTasks(Number(this.route.snapshot.paramMap.get('projectId')));
      }
    })
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get("projectId");
      if(projectId) this.projectId = +projectId;
    })
  }

  protected openTaskEditModal(){
    this.dialog.open(EditTaskForm, {data: {projectId: this.projectId, task: this.taskObject}});
  }

  get humanReadableState(){
    switch (this.taskObject.state) {
      case "TO_DO":{
        return "To Do"
      }
      case "IN_PROGRESS":{
        return "In Progress"
      }
      case "DONE":{
        return "Done"
      }
      default:{
        return "ERROR"
      }
    }
  }
}
