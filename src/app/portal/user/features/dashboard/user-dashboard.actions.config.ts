import {
  LucideMap,
  LucidePackage,
  LucideSquarePlus,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import {
  USER_CARGO_URL,
  USER_CREATE_CARGO_URL,
  USER_CREATE_ROUTE_URL,
  USER_CREATE_STORAGE_URL,
  USER_MY_CARGO_URL,
  USER_MY_ROUTES_URL,
  USER_MY_STORAGE_URL,
  USER_ROUTES_URL,
  USER_STORAGE_URL,
} from '../../../../shared/constants/app-urls';

export interface UserDashboardAction {
  titleKey: string;
  descriptionKey: string;
  route: string;
  icon: LucideIcon;
}

export const USER_DASHBOARD_ENTITY_ACTION_GROUPS: UserDashboardAction[][] = [
  [
    {
      titleKey: 'portal.user.nav.allRoutes',
      descriptionKey: 'portal.user.features.dashboard.actions.allRoutes.description',
      route: USER_ROUTES_URL,
      icon: LucideMap,
    },
    {
      titleKey: 'portal.user.nav.myRoutes',
      descriptionKey: 'portal.user.features.dashboard.actions.myRoutes.description',
      route: USER_MY_ROUTES_URL,
      icon: LucideMap,
    },
    {
      titleKey: 'portal.user.nav.postRoute',
      descriptionKey: 'portal.user.features.dashboard.actions.postRoute.description',
      route: USER_CREATE_ROUTE_URL,
      icon: LucideSquarePlus,
    },
  ],
  [
    {
      titleKey: 'portal.user.nav.allCargo',
      descriptionKey: 'portal.user.features.dashboard.actions.allCargo.description',
      route: USER_CARGO_URL,
      icon: LucidePackage,
    },
    {
      titleKey: 'portal.user.nav.myCargo',
      descriptionKey: 'portal.user.features.dashboard.actions.myCargo.description',
      route: USER_MY_CARGO_URL,
      icon: LucidePackage,
    },
    {
      titleKey: 'portal.user.nav.postCargo',
      descriptionKey: 'portal.user.features.dashboard.actions.postCargo.description',
      route: USER_CREATE_CARGO_URL,
      icon: LucideSquarePlus,
    },
  ],
  [
    {
      titleKey: 'portal.user.nav.allStorage',
      descriptionKey: 'portal.user.features.dashboard.actions.allStorage.description',
      route: USER_STORAGE_URL,
      icon: LucideWarehouse,
    },
    {
      titleKey: 'portal.user.nav.myStorage',
      descriptionKey: 'portal.user.features.dashboard.actions.myStorage.description',
      route: USER_MY_STORAGE_URL,
      icon: LucideWarehouse,
    },
    {
      titleKey: 'portal.user.nav.postStorage',
      descriptionKey: 'portal.user.features.dashboard.actions.postStorage.description',
      route: USER_CREATE_STORAGE_URL,
      icon: LucideSquarePlus,
    },
  ],
];
