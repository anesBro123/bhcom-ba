/** Portal accent colors: see src/styles/_portal-accent.scss */
import {
  EMPLOYEE_HOME_URL,
  EMPLOYEE_LOGIN_URL,
} from '../common/constants/portal-urls';
import { PortalConfig } from '../common/models/portal-config.model';
import { EMPLOYEE_NAV } from './employee-nav.config';

export const EMPLOYEE_PORTAL_CONFIG: PortalConfig = {
  portal: 'employee',
  homeUrl: EMPLOYEE_HOME_URL,
  loginUrl: EMPLOYEE_LOGIN_URL,
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
