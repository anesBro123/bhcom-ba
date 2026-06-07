import type { PortalKind } from './portal-kind.type';

export const LANDING_URL = '/';
export const SIGN_IN_URL = '/sign-in';
export const COMPANY_REGISTER_URL = '/register';
export const EMPLOYEE_LOGIN_URL = '/login';
export const ADMIN_LOGIN_URL = '/admin/login';
export const EMPLOYEE_HOME_URL = '/dashboard';
export const ADMIN_HOME_URL = '/admin/dashboard';

export function portalHomeUrl(portalKind: PortalKind): string {
  return portalKind === 'admin' ? ADMIN_HOME_URL : EMPLOYEE_HOME_URL;
}
