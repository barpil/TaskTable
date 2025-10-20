import { Component } from '@angular/core';
import {LogoutBtn} from '../common-components/logout-btn/logout-btn';

@Component({
  selector: 'app-main-page',
  imports: [
    LogoutBtn
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {

}
