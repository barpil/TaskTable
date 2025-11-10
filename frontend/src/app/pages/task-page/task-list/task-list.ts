import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task-service';
import {Tasks} from '../../../services/data/task';
import {LoadingAnimation} from '../../../common-components/loading-animation/loading-animation';
import {TaskTile} from '../task-tile/task-tile';

@Component({
  selector: 'task-list',
  imports: [
    LoadingAnimation,
    TaskTile,
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
    });
  }

}
