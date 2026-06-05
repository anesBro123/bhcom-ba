/** Portal accent colors: see src/styles/_portal-accent.scss */
import {
  ADMIN_HOME_URL,
  ADMIN_LOGIN_URL,
  ADMIN_REGISTER_URL,
} from '../common/constants/portal-urls';
import { PortalConfig } from '../common/models/portal-config.model';
import { ADMIN_NAV } from './admin-nav.config';

export const ADMIN_PORTAL_CONFIG: PortalConfig = {
  portal: 'admin',
  homeUrl: ADMIN_HOME_URL,
  loginUrl: ADMIN_LOGIN_URL,
  registerUrl: ADMIN_REGISTER_URL,
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
