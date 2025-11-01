import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {UserService} from '../services/user-service';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';

export const UserResolver: ResolveFn<Record<string, string>| null | RedirectCommand> = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router)
  const errorUrlTree = router.parseUrl('/error');
  return userService.getLoggedUserInfo().pipe(
    map(userInfo => {
      if(userInfo){
        return userInfo;
      }
      else return new RedirectCommand(errorUrlTree, {skipLocationChange: true});
    }),
    catchError(() => {
      return of(new RedirectCommand(errorUrlTree, {skipLocationChange: true}));
    })
  );
};
