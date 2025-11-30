import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {PermissionService} from '../services/permission-service';


export const canActivateProject: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const projectId = route.paramMap.get('projectId');

  if (!projectId) {
    router.navigate(['/error-page']);
    return new Observable<boolean>(observer => observer.next(false));
  }

  return permissionService.canAccessProject(projectId).pipe(
    take(1),
    map(canAccess => {
      if (canAccess) {
        return true;
      } else {
        router.navigate(['/error-page']);
        return false;
      }
    })
  );
};
