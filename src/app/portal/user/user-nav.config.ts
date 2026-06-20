import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  USER_FREIGHT_URL,
  USER_HOME_URL,
  USER_OFFER_URL,
  USER_OUR_FREIGHT_URL,
  USER_OUR_TRANSPORT_URL,
  USER_OUR_WAREHOUSE_URL,
  USER_TRANSPORT_URL,
  USER_WAREHOUSE_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';
import { UserPageIcons } from './user-page-icons';

export const USER_NAV: NavSection[] = [
  {
    titleKey: 'portal.user.nav.sections.home',
    icon: UserPageIcons.home,
    items: [
      {
        labelKey: 'portal.user.nav.home',
        route: USER_HOME_URL,
        exact: true,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.find',
    icon: UserPageIcons.find,
    items: [
      {
        labelKey: 'portal.user.nav.transport',
        route: USER_TRANSPORT_URL,
        exact: true,
        icon: UserPageIcons.transport,
      },
      {
        labelKey: 'portal.user.nav.freight',
        route: USER_FREIGHT_URL,
        exact: true,
        icon: UserPageIcons.freight,
      },
      {
        labelKey: 'portal.user.nav.warehouse',
        route: USER_WAREHOUSE_URL,
        exact: true,
        icon: UserPageIcons.warehouse,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.ourListings',
    icon: UserPageIcons.ourListings,
    items: [
      {
        labelKey: 'portal.user.nav.transport',
        route: USER_OUR_TRANSPORT_URL,
        exact: true,
        icon: UserPageIcons.transport,
      },
      {
        labelKey: 'portal.user.nav.freight',
        route: USER_OUR_FREIGHT_URL,
        exact: true,
        icon: UserPageIcons.freight,
      },
      {
        labelKey: 'portal.user.nav.warehouse',
        route: USER_OUR_WAREHOUSE_URL,
        exact: true,
        icon: UserPageIcons.warehouse,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.offer',
    icon: UserPageIcons.offer,
    items: [
      {
        labelKey: 'portal.user.nav.offer',
        route: USER_OFFER_URL,
      },
    ],
  },
];
