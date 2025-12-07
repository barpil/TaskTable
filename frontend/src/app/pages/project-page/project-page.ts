import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectList} from './project-list/project-list';
import {ReturnBtn} from '../../common-components/return-btn/return-btn';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';
import {LogoutBtn} from '../../common-components/logout-btn/logout-btn';
import {Dialog} from '@angular/cdk/dialog';
import {CreateProjectDialog} from './create-project-dialog/create-project-dialog';

@Component({
  selector: 'app-project-page',
  imports: [
    ProjectList,
    ReturnBtn,
    ButtonPanel,
    LogoutBtn
  ],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css'
})
export class ProjectPage implements OnInit{
  teamId!: number;
  dialog = inject(Dialog)
  @ViewChild('projectList')
  readonly projectListRef!: ProjectList;
  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get("teamId");
      if(id) this.teamId = +id;
    })
  }

  protected openCreateProjectModal() {
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      data: {teamId: this.teamId}
    });
    dialogRef.closed.subscribe(() => {
      this.projectListRef.refreshProjects();
    });
  }


}
