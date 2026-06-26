import { USER_HOME_URL } from '../../shared/constants/app-urls';
import { PortalConfig } from '../common/models/portal-config.model';
import { USER_TOPBAR_NAV } from './user-topbar-nav.config';

export const USER_PORTAL_CONFIG: PortalConfig = {
  portalKind: 'user',
  topbarNav: USER_TOPBAR_NAV,
  shell: {
    homeUrl: USER_HOME_URL,
  },
};
