/** Portal accent colors: see src/styles/_portal-accent.scss */
import { ADMIN_HOME_URL } from '../../shared/constants/app-urls';
import { PortalConfig } from '../common/models/portal-config.model';

export const ADMIN_PORTAL_CONFIG: PortalConfig = {
  portalKind: 'admin',
  topbarNav: [],
  shell: {
    brandSuffixKey: 'portal.shell.admin.badge',
    homeUrl: ADMIN_HOME_URL,
  },
};
