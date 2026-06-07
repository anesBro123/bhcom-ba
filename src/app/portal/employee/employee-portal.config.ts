/** Portal accent colors: see src/styles/_portal-accent.scss */
import { PortalConfig } from '../common/models/portal-config.model';
import { EMPLOYEE_NAV } from './employee-nav.config';

export const EMPLOYEE_PORTAL_CONFIG: PortalConfig = {
  portalKind: 'employee',
  nav: EMPLOYEE_NAV,
  shell: {
    brandSuffixKey: 'portal.employee.badge',
  },
};
