import {
  LucideSettings,
  LucideSquarePlus,
  LucideTruck,
  LucideUsers,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import {
  ADMIN_CREATE_USER_URL,
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_CREATE_WAREHOUSE_URL,
  ADMIN_SETTINGS_URL,
  ADMIN_USERS_URL,
  ADMIN_VEHICLES_URL,
  ADMIN_WAREHOUSES_URL,
} from '../../../../shared/constants/app-urls';

export interface AdminDashboardAction {
  titleKey: string;
  descriptionKey: string;
  route: string;
  icon: LucideIcon;
}

export const ADMIN_DASHBOARD_ENTITY_ACTION_GROUPS: AdminDashboardAction[][] = [
  [
    {
      titleKey: 'portal.admin.nav.allUsers',
      descriptionKey: 'portal.admin.features.dashboard.actions.allUsers.description',
      route: ADMIN_USERS_URL,
      icon: LucideUsers,
    },
    {
      titleKey: 'portal.admin.nav.createUser',
      descriptionKey: 'portal.admin.features.dashboard.actions.createUser.description',
      route: ADMIN_CREATE_USER_URL,
      icon: LucideSquarePlus,
    },
  ],
  [
    {
      titleKey: 'portal.admin.nav.allVehicles',
      descriptionKey: 'portal.admin.features.dashboard.actions.allVehicles.description',
      route: ADMIN_VEHICLES_URL,
      icon: LucideTruck,
    },
    {
      titleKey: 'portal.admin.nav.createVehicle',
      descriptionKey: 'portal.admin.features.dashboard.actions.createVehicle.description',
      route: ADMIN_CREATE_VEHICLE_URL,
      icon: LucideSquarePlus,
    },
  ],
  [
    {
      titleKey: 'portal.admin.nav.allWarehouses',
      descriptionKey: 'portal.admin.features.dashboard.actions.allWarehouses.description',
      route: ADMIN_WAREHOUSES_URL,
      icon: LucideWarehouse,
    },
    {
      titleKey: 'portal.admin.nav.createWarehouse',
      descriptionKey: 'portal.admin.features.dashboard.actions.createWarehouse.description',
      route: ADMIN_CREATE_WAREHOUSE_URL,
      icon: LucideSquarePlus,
    },
  ],
];

export const ADMIN_DASHBOARD_SETTINGS_ACTION: AdminDashboardAction = {
  titleKey: 'portal.admin.pages.settings.title',
  descriptionKey: 'portal.admin.features.dashboard.actions.settings.description',
  route: ADMIN_SETTINGS_URL,
  icon: LucideSettings,
};
