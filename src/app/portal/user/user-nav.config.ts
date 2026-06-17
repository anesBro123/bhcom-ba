import {
  LucideLayoutGrid,
  LucideMap,
  LucidePackage,
  LucideSquarePlus,
  LucideWarehouse,
} from '@lucide/angular';
import {
  USER_CARGO_URL,
  USER_CREATE_CARGO_URL,
  USER_CREATE_ROUTE_URL,
  USER_CREATE_STORAGE_URL,
  USER_HOME_URL,
  USER_ROUTES_URL,
  USER_STORAGE_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';

export const USER_NAV: NavSection[] = [
  {
    titleKey: 'portal.user.nav.sections.dashboard',
    items: [
      {
        labelKey: 'portal.user.nav.overview',
        route: USER_HOME_URL,
        icon: LucideLayoutGrid,
        exact: true,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.routes',
    items: [
      {
        labelKey: 'portal.user.nav.allRoutes',
        route: USER_ROUTES_URL,
        icon: LucideMap,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postRoute',
        route: USER_CREATE_ROUTE_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.cargo',
    items: [
      {
        labelKey: 'portal.user.nav.allCargo',
        route: USER_CARGO_URL,
        icon: LucidePackage,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postCargo',
        route: USER_CREATE_CARGO_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.storage',
    items: [
      {
        labelKey: 'portal.user.nav.allStorage',
        route: USER_STORAGE_URL,
        icon: LucideWarehouse,
        exact: true,
      },
      {
        labelKey: 'portal.user.nav.postStorage',
        route: USER_CREATE_STORAGE_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
];
