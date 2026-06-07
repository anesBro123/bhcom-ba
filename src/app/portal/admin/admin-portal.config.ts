/** Portal accent colors: see src/styles/_portal-accent.scss */
import { PortalConfig } from '../common/models/portal-config.model';
import { ADMIN_NAV } from './admin-nav.config';

export const ADMIN_PORTAL_CONFIG: PortalConfig = {
  portalKind: 'admin',
  nav: ADMIN_NAV,
  shell: {
    brandSuffixKey: 'portal.admin.badge',
  },
};
