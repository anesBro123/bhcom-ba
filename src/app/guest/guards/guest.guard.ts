import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/core/auth/auth.service';
import { portalHomeUrl } from '../../portal/common/constants/portal-urls';
import { PORTAL_CONFIG } from '../../portal/common/models/portal-config.model';

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

  return router.createUrlTree([portalHomeUrl(auth.portal()!)]);
};
