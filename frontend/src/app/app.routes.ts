import { Routes } from '@angular/router';
import {WelcomePage} from './src/app/welcome-page/welcome-page';
import {LoginPage} from './src/app/login-page/login-page';
import {MainPage} from './src/app/main-page/main-page';
import {AuthGuard} from './src/app/auth-guard';
import {RegisterPage} from './src/app/register-page/register-page';
import {ErrorPage} from './src/app/error-page/error-page';
import {UserResolver} from './src/app/resolvers/user-resolver-resolver';

export const routes: Routes = [
  {path: '', component: WelcomePage},
  {path: 'error', component: ErrorPage},
  {path: 'login', component: LoginPage},
  {path: 'register', component: RegisterPage},
  {path: 'main-page', component: MainPage, canActivate: [AuthGuard],
    resolve: {
      userInfo: UserResolver
    }},
  {path: '**', redirectTo: ''}
];
