import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ADMIN_PORTAL_CONFIG, EMPLOYEE_PORTAL_CONFIG } from './portal.config';
import { PORTAL_CONFIG } from './portal.model';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const config = inject(PORTAL_CONFIG);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }

  if (auth.portal() === config.portal) {
    return router.createUrlTree([config.homeUrl]);
  }

  const homeUrl =
    auth.portal() === 'admin' ? ADMIN_PORTAL_CONFIG.homeUrl : EMPLOYEE_PORTAL_CONFIG.homeUrl;
  return router.createUrlTree([homeUrl]);
};
