import { Routes } from '@angular/router';
import {WelcomePage} from './src/app/welcome-page/welcome-page';
import {LoginPage} from './src/app/login-page/login-page';
import {MainPage} from './src/app/main-page/main-page';
import {AuthGuard} from './src/app/auth-guard';

export const routes: Routes = [
  {path: '', component: WelcomePage},
  {path: 'login', component: LoginPage},
  {path: 'main-page', component: MainPage, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];
