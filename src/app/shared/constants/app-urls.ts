export * from './guest-urls';
export * from './user-urls';
export * from './admin-urls';

import type { PortalKind } from './portal-kind.type';
import { ADMIN_HOME_URL } from './admin-urls';
import { USER_HOME_URL } from './user-urls';

export function portalHomeUrl(portalKind: PortalKind): string {
  return portalKind === 'admin' ? ADMIN_HOME_URL : USER_HOME_URL;
}
