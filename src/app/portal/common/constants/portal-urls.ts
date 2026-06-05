import type { Portal } from '../../../shared/core/auth/portal.type';

export const EMPLOYEE_HOME_URL = '/dashboard';
export const ADMIN_HOME_URL = '/admin/dashboard';
export const EMPLOYEE_LOGIN_URL = '/login';
export const ADMIN_LOGIN_URL = '/admin/login';
export const ADMIN_REGISTER_URL = '/admin/register';

export function portalHomeUrl(portal: Portal): string {
  return portal === 'admin' ? ADMIN_HOME_URL : EMPLOYEE_HOME_URL;
}
