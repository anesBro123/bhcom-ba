/** Portal accent colors: see src/styles/_portal-accent.scss */
import { ADMIN_NAV } from '../../layout/sidebar/admin-nav.config';
import { EMPLOYEE_NAV } from '../../layout/sidebar/employee-nav.config';
import { PortalConfig } from './portal.model';

export const EMPLOYEE_PORTAL_CONFIG: PortalConfig = {
  portal: 'employee',
  homeUrl: '/dashboard',
  loginUrl: '/login',
  nav: EMPLOYEE_NAV,
  login: {
    titleKey: 'login.employee.title',
    subtitleKey: 'login.employee.subtitle',
    badgeKey: 'login.employee.badge',
  },
  shell: {
    brandSuffixKey: 'portal.employee.badge',
  },
};

export const ADMIN_PORTAL_CONFIG: PortalConfig = {
  portal: 'admin',
  homeUrl: '/admin/dashboard',
  loginUrl: '/admin/login',
  registerUrl: '/admin/register',
  nav: ADMIN_NAV,
  login: {
    titleKey: 'login.admin.title',
    subtitleKey: 'login.admin.subtitle',
    badgeKey: 'login.admin.badge',
  },
  shell: {
    brandSuffixKey: 'portal.admin.badge',
  },
};
