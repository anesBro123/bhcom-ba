/** Portal accent colors: see src/styles/_portal-accent.scss */
import { USER_HOME_URL } from '../../shared/constants/app-urls';
import { PortalConfig } from '../common/models/portal-config.model';
import { USER_NAV } from './user-nav.config';

export const USER_PORTAL_CONFIG: PortalConfig = {
  portalKind: 'user',
  nav: USER_NAV,
  shell: {
    brandSuffixKey: 'portal.shell.user.badge',
    homeUrl: USER_HOME_URL,
  },
};
