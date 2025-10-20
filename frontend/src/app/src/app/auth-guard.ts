import {CanActivateFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router)
  const validateEndpoint = 'http://localhost:8080/api/auth/validate';
  return http.get(validateEndpoint, {withCredentials: true}).pipe(
    map(() => true), //Jezeli przejdzie w backendzie validate ze statusem 200 to AuthGuard potwierdza autoryzacje
    catchError(() => {
      router.navigate(['/login'], {queryParams: {redirectTo: state.url}});
      return of(false);
    })
  );
};
