import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.getToken() && !authService.isTokenExpired()) {
    return true;
  } else {
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};
