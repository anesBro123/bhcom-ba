import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { portalHomeUrl } from '../../shared/constants/app-urls';
import { AuthService } from '../../shared/core/auth/auth.service';

/** Guest pages are for unauthenticated users; redirect authenticated sessions to portal home. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([portalHomeUrl(auth.portalKind()!)]);
};
