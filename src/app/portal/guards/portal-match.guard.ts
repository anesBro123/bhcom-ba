import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import type { PortalKind } from '../../shared/constants/portal-kind.type';
import { LANDING_URL, portalHomeUrl } from '../../shared/constants/app-urls';
import { AuthService } from '../../shared/core/auth/auth.service';

export function portalMatchGuard(expectedKind: PortalKind): CanMatchFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      return router.createUrlTree([LANDING_URL]);
    }

    const sessionKind = auth.portalKind();
    if (sessionKind !== expectedKind) {
      return router.createUrlTree([portalHomeUrl(sessionKind!)]);
    }

    return true;
  };
}
