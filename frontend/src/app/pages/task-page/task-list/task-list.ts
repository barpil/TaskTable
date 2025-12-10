import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task-service';
import {Tasks, Task, TaskStatus} from '../../../services/data/task';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {TaskTile} from '../task-tile/task-tile';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskFilter, TaskFilterInputData, TaskFilterResultData} from '../task-filter/task-filter';
import {UserNameEmail} from '../../../services/data/user';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'task-list',
  imports: [
    LoadingAnimation,
    TaskTile,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit{
  @Input() projectId!: number;

  tasks: Tasks | null = null;
  selectedUsers: UserNameEmail[] = [];
  selectedStates: TaskStatus[] = [];

  constructor(private readonly tasksService: TaskService, private readonly dialog: MatDialog) {}

  ngOnInit(){
    this.tasksService.loadTasks(this.projectId)
    this.tasksService.tasks$.subscribe(data => {
      this.tasks = data;
      this.groupTasks(this.tasks?.tasks ?? []);
    });
  }

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  private groupTasks(tasks: Task[]){
    this.todoTasks = tasks.filter(t => t.state === 'TO_DO') ?? [];
    this.inProgressTasks = tasks.filter(t => t.state === 'IN_PROGRESS') ?? [];
    this.doneTasks = tasks.filter(t => t.state === 'DONE') ?? [];
}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedTask = event.container.data[event.currentIndex];
      const newState = this.getStateFromListId(event.container.id);

      if (movedTask.state !== newState) {
        movedTask.state = newState;
        this.tasksService.changeTaskState(movedTask.id, newState).subscribe();
      }
    }
  }

  private getStateFromListId(id: string): 'TO_DO' | 'IN_PROGRESS' | 'DONE' {
    switch(id) {
      case 'todo':
        return 'TO_DO';
      case 'in-progress':
        return 'IN_PROGRESS';
      case 'done':
        return 'DONE';
      default:
        return 'TO_DO';
    }
  }

  openFilterModal(){
    const taskFilterInputData: TaskFilterInputData = {
      tasks: this.tasks?.tasks ?? [],
      selectedUsers: this.selectedUsers,
      selectedStates: this.selectedStates
    };
    const dialogRef: MatDialogRef<TaskFilter, TaskFilterResultData> = this.dialog.open(TaskFilter, {data: taskFilterInputData});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedStates = result.selectedStates;
        this.selectedUsers = result.selectedUsers;
        const filteredEmails = result.selectedUsers.map(user => user.email);
        if(this.selectedUsers.length == 0 && this.selectedStates.length ==0){
          this.groupTasks(this.tasks?.tasks ?? []);
          return;
        }
        const filteredTasks: Task[] = this.tasks?.tasks.filter(task => {
          if(this.selectedStates.length == 0){
            return task.assigned_users.some(user => filteredEmails.includes(user.email));
          }else if(this.selectedUsers.length == 0){
            return this.selectedStates.includes(task.state);
          }
          return task.assigned_users.some(user => filteredEmails.includes(user.email)) && this.selectedStates.includes(task.state);
        }) ?? [];
        this.groupTasks(filteredTasks);
      }
    })

  }

}
