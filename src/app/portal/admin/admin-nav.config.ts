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
    icon: AdminPageIcons.dashboard,
    items: [
      {
        labelKey: 'portal.admin.nav.overview',
        route: ADMIN_HOME_URL,
        exact: true,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.users',
    icon: AdminPageIcons.users,
    items: [
      {
        labelKey: 'portal.admin.nav.allUsers',
        route: ADMIN_USERS_URL,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createUser',
        route: ADMIN_CREATE_USER_URL,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.vehicles',
    icon: AdminPageIcons.vehicles,
    items: [
      {
        labelKey: 'portal.admin.nav.allVehicles',
        route: ADMIN_VEHICLES_URL,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createVehicle',
        route: ADMIN_CREATE_VEHICLE_URL,
      },
    ],
  },
  {
    titleKey: 'portal.admin.nav.sections.warehouses',
    icon: AdminPageIcons.warehouses,
    items: [
      {
        labelKey: 'portal.admin.nav.allWarehouses',
        route: ADMIN_WAREHOUSES_URL,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createWarehouse',
        route: ADMIN_CREATE_WAREHOUSE_URL,
      },
    ],
  },
];
