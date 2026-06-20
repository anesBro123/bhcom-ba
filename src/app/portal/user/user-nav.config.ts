import {
  USER_FIND_URL,
  USER_HOME_URL,
  USER_OFFER_URL,
  USER_OUR_LISTINGS_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';
import { UserPageIcons } from './user-page-icons';

export const USER_NAV: NavSection[] = [
  {
    titleKey: 'portal.user.nav.home',
    icon: UserPageIcons.home,
    route: USER_HOME_URL,
    exact: true,
  },
  {
    titleKey: 'portal.user.nav.find',
    icon: UserPageIcons.find,
    route: USER_FIND_URL,
    exact: true,
  },
  {
    titleKey: 'portal.user.nav.ourListings',
    icon: UserPageIcons.ourListings,
    route: USER_OUR_LISTINGS_URL,
    exact: true,
  },
  {
    titleKey: 'portal.user.nav.offer',
    icon: UserPageIcons.offer,
    route: USER_OFFER_URL,
  },
];
