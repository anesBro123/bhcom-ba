import {
  USER_CARGO_URL,
  USER_CREATE_CARGO_URL,
  USER_CREATE_ROUTE_URL,
  USER_CREATE_STORAGE_URL,
  USER_HOME_URL,
  USER_MY_CARGO_URL,
  USER_MY_ROUTES_URL,
  USER_MY_STORAGE_URL,
  USER_ROUTES_URL,
  USER_STORAGE_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';
import { UserPageIcons } from './user-page-icons';

export const USER_NAV: NavSection[] = [
  {
    titleKey: 'portal.user.nav.sections.dashboard',
    icon: UserPageIcons.dashboard,
    items: [
      {
        labelKey: 'portal.user.nav.overview',
        route: USER_HOME_URL,
        exact: true,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.routes',
    icon: UserPageIcons.routes,
    items: [
      {
        labelKey: 'portal.user.nav.allRoutes',
        route: USER_ROUTES_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.myRoutes',
        route: USER_MY_ROUTES_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postRoute',
        route: USER_CREATE_ROUTE_URL,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.cargo',
    icon: UserPageIcons.cargo,
    items: [
      {
        labelKey: 'portal.user.nav.allCargo',
        route: USER_CARGO_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.myCargo',
        route: USER_MY_CARGO_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postCargo',
        route: USER_CREATE_CARGO_URL,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.storage',
    icon: UserPageIcons.storage,
    items: [
      {
        labelKey: 'portal.user.nav.allStorage',
        route: USER_STORAGE_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.myStorage',
        route: USER_MY_STORAGE_URL,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postStorage',
        route: USER_CREATE_STORAGE_URL,
      },
    ],
  },
];
