export * from './guest-urls';
export * from './employee-urls';
export * from './admin-urls';

import type { PortalKind } from './portal-kind.type';
import { ADMIN_HOME_URL } from './admin-urls';
import { EMPLOYEE_HOME_URL } from './employee-urls';

export function portalHomeUrl(portalKind: PortalKind): string {
  return portalKind === 'admin' ? ADMIN_HOME_URL : EMPLOYEE_HOME_URL;
}
