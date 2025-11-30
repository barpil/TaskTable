import {Component, inject, OnInit} from '@angular/core';
import {TaskList} from './task-list/task-list';
import {ActivatedRoute} from '@angular/router';
import {ReturnBtn} from '../../common-components/return-btn/return-btn';
import {Dialog} from '@angular/cdk/dialog';
import {AddTaskForm} from './add-task-form/add-task-form';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';

@Component({
  selector: 'app-task-page',
  imports: [
    TaskList,
    ReturnBtn,
    ButtonPanel
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css'
})
export class TaskPage implements OnInit{
  teamId!: number;
  projectId!: number;
  private dialog = inject(Dialog);

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const teamId = paramMap.get("teamId");
      const projectId = paramMap.get("projectId");
      if(projectId) this.projectId = +projectId;
      if(teamId) this.teamId = +teamId;
    })
  }

  openModal(){
    this.dialog.open(AddTaskForm, {data: {projectId: this.projectId}});
  }
}
