import {CanActivateFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../environments/environment';

export const AuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router)
  const validateEndpoint = environment.apiUrl+'/auth/validate';
  return http.get(validateEndpoint, {withCredentials: true}).pipe(
    map(() => true), //Jezeli przejdzie w backendzie validate ze statusem 200 to AuthGuard potwierdza autoryzacje
    catchError(() => {
      router.navigate(['/login'], {queryParams: {redirectTo: state.url}});
      return of(false);
    })
  );
};
