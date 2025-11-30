import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectList} from './project-list/project-list';
import {ReturnBtn} from '../../common-components/return-btn/return-btn';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';
import {LogoutBtn} from '../../common-components/logout-btn/logout-btn';

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

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get("teamId");
      if(id) this.teamId = +id;
    })
  }
}
