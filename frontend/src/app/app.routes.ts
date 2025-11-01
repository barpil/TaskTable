import { Routes } from '@angular/router';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {ErrorPage} from './pages/error-page/error-page';
import {LoginPage} from './pages/login-page/login-page';
import {RegisterPage} from './pages/register-page/register-page';
import {MainPage} from './pages/main-page/main-page';
import {AuthGuard} from './auth-guard';
import {UserResolver} from './resolvers/user-resolver-resolver';


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
