import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/core/auth/auth.service';
import { portalHomeUrl } from '../../portal/common/constants/portal-urls';

export const publicGuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([portalHomeUrl(auth.portal()!)]);
};
