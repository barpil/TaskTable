import { Routes } from '@angular/router';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {ErrorPage} from './pages/error-page/error-page';
import {LoginPage} from './pages/login-page/login-page';
import {RegisterPage} from './pages/register-page/register-page';
import {MainPage} from './pages/main-page/main-page';
import {UserResolver} from './resolvers/user-resolver-resolver';
import {ProjectPage} from './pages/project-page/project-page';
import {TaskPage} from './pages/task-page/task-page';
import {canActivateTeam} from './guards/canActivateTeam';
import {AuthGuard} from './guards/auth-guard';
import {canActivateProject} from './guards/canActivateProject';


export const routes: Routes = [
  {path: '', component: WelcomePage},
  {path: 'error', component: ErrorPage},
  {path: 'login', component: LoginPage},
  {path: 'register', component: RegisterPage},
  {path: 'main-page', component: MainPage, canActivate: [AuthGuard],
    resolve: {
      userInfo: UserResolver
    }},
  {path: 'teams/:teamId', component: ProjectPage, canActivate: [AuthGuard, canActivateTeam]},
  {path: 'teams/:teamId/projects/:projectId', component: TaskPage, canActivate: [AuthGuard, canActivateTeam, canActivateProject]},
  {path: '**', redirectTo: ''}
];
