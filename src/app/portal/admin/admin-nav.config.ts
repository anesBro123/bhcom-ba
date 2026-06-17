import { LucideSquarePlus } from '@lucide/angular';
import {
  ADMIN_CREATE_USER_URL,
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_CREATE_WAREHOUSE_URL,
  ADMIN_HOME_URL,
  ADMIN_USERS_URL,
  ADMIN_VEHICLES_URL,
  ADMIN_WAREHOUSES_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';
import { AdminPageIcons } from './admin-page-icons';

export const ADMIN_NAV: NavSection[] = [
  {
    titleKey: 'portal.admin.nav.sections.dashboard',
    items: [
      {
        labelKey: 'portal.admin.nav.overview',
        route: ADMIN_HOME_URL,
        icon: AdminPageIcons.dashboard,
        exact: true,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.users',
    items: [
      {
        labelKey: 'portal.admin.nav.allUsers',
        route: ADMIN_USERS_URL,
        icon: AdminPageIcons.users,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createUser',
        route: ADMIN_CREATE_USER_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.vehicles',
    items: [
      {
        labelKey: 'portal.admin.nav.allVehicles',
        route: ADMIN_VEHICLES_URL,
        icon: AdminPageIcons.vehicles,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createVehicle',
        route: ADMIN_CREATE_VEHICLE_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.warehouses',
    items: [
      {
        labelKey: 'portal.admin.nav.allWarehouses',
        route: ADMIN_WAREHOUSES_URL,
        icon: AdminPageIcons.warehouses,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createWarehouse',
        route: ADMIN_CREATE_WAREHOUSE_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
];
