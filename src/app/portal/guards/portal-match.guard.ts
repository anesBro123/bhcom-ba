import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../shared/core/auth/auth.service';
import type { Portal } from '../../shared/core/auth/portal.type';
import { LANDING_URL } from '../../guest/guest.constants';
import { portalHomeUrl } from '../common/constants/portal-urls';

export function portalMatchGuard(expected: Portal): CanMatchFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      return router.createUrlTree([LANDING_URL]);
    }

    const sessionPortal = auth.portal();
    if (sessionPortal !== expected) {
      return router.createUrlTree([portalHomeUrl(sessionPortal!)]);
    }

    return true;
  };
}
