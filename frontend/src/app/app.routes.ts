import { Routes } from '@angular/router';
import {WelcomePage} from './src/app/welcome-page/welcome-page';
import {LoginPage} from './src/app/login-page/login-page';

export const routes: Routes = [
  {path: '', component: WelcomePage},
  {path: 'login', component: LoginPage},
  {path: '**', redirectTo: ''}
];
