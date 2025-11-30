import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task-service';
import {Tasks, Task} from '../../../services/data/task';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {TaskTile} from '../task-tile/task-tile';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  constructor(private readonly tasksService: TaskService) {}

  ngOnInit(){
    this.tasksService.loadTasks(this.projectId)
    this.tasksService.tasks$.subscribe(data => {
      this.tasks = data;
      this.groupTasks();
    });
  }

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  private groupTasks(){
    this.todoTasks = this.tasks?.tasks.filter(t => t.state === 'TO_DO') ?? [];
    this.inProgressTasks = this.tasks?.tasks.filter(t => t.state === 'IN_PROGRESS') ?? [];
    this.doneTasks = this.tasks?.tasks.filter(t => t.state === 'DONE') ?? [];
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

}
