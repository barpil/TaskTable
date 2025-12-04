import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'return-btn',
  imports: [],
  templateUrl: './return-btn.html',
  styleUrl: './return-btn.css'
})
export class ReturnBtn {
  @Input() returnPath!: string;

  constructor(private readonly route: Router) {
  }

  returnToPage(){
    this.route.navigate([this.returnPath]);
  }
}
