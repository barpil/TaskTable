import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'welcome-page',
  imports: [],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage {
  private readonly router: Router;
  constructor(router: Router) {
    this.router=router;
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
