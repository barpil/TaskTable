import {Component, inject, Input, OnInit} from '@angular/core';
import {Task} from '../../../services/data/task';
import {ActivatedRoute} from '@angular/router';
import {Dialog} from '@angular/cdk/dialog';
import {TaskView} from './task-view/task-view';

@Component({
  selector: 'task-tile',
  imports: [],
  templateUrl: './task-tile.html',
  styleUrl: './task-tile.css'
})
export class TaskTile implements OnInit{
  @Input() taskObject!: Task;
  projectId!: number;
  private readonly dialog = inject(Dialog);
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get("projectId");
      if(projectId) this.projectId = +projectId;
    })
  }

  protected openTaskDetailsModal(): void {
    this.dialog.open(TaskView, {
      data: { projectId: this.projectId, task: this.taskObject }
    });
  }
}
