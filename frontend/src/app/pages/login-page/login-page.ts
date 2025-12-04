import { Component } from '@angular/core';
import {LoginForm} from './login-form/login-form';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'login-page',
  imports: [
    LoginForm,
    RouterLink
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

}
