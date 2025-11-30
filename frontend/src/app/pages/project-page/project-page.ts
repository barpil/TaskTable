import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {TeamList} from '../main-page/team-list/team-list';
import {ProjectList} from './project-list/project-list';
import {ReturnBtn} from '../../common-components/return-btn/return-btn';
import {ButtonPanel} from '../../common-components/button-panel/button-panel';

@Component({
  selector: 'app-project-page',
  imports: [
    TeamList,
    ProjectList,
    RouterOutlet,
    ReturnBtn,
    ButtonPanel
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
