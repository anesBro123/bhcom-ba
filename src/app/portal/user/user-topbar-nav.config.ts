import { USER_FIND_URL, USER_OFFER_URL } from '../../shared/constants/app-urls';
import type { TopbarNavItem } from '../common/models/portal-config.model';

export const USER_TOPBAR_NAV: TopbarNavItem[] = [
  {
    labelKey: 'portal.user.nav.find',
    route: USER_FIND_URL,
    exact: true,
  },
  {
    labelKey: 'portal.user.nav.offer',
    route: USER_OFFER_URL,
  },
];
