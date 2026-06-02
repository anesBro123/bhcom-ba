import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ADMIN_PORTAL_CONFIG, EMPLOYEE_PORTAL_CONFIG } from './portal.config';
import { Portal } from './portal.model';

export function portalMatchGuard(expected: Portal): CanMatchFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      const loginUrl =
        expected === 'admin'
          ? ADMIN_PORTAL_CONFIG.loginUrl
          : EMPLOYEE_PORTAL_CONFIG.loginUrl;
      return router.createUrlTree([loginUrl]);
    }

    const sessionPortal = auth.portal();
    if (sessionPortal !== expected) {
      const homeUrl =
        sessionPortal === 'admin'
          ? ADMIN_PORTAL_CONFIG.homeUrl
          : EMPLOYEE_PORTAL_CONFIG.homeUrl;
      return router.createUrlTree([homeUrl]);
    }

    return true;
  };
}
