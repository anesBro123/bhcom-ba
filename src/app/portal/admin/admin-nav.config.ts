import { LucideSquarePlus, LucideTruck, LucideUsers, LucideWarehouse } from '@lucide/angular';
import {
  ADMIN_CREATE_EMPLOYEE_URL,
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_CREATE_WAREHOUSE_URL,
  ADMIN_EMPLOYEES_URL,
  ADMIN_VEHICLES_URL,
  ADMIN_WAREHOUSES_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';

export const ADMIN_NAV: NavSection[] = [
  {
    titleKey: 'portal.admin.nav.sections.users',
    items: [
      {
        labelKey: 'portal.admin.nav.allEmployees',
        route: ADMIN_EMPLOYEES_URL,
        icon: LucideUsers,
        exact: true,
      },
      {
        labelKey: 'portal.admin.nav.createEmployee',
        route: ADMIN_CREATE_EMPLOYEE_URL,
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
        icon: LucideTruck,
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
        icon: LucideWarehouse,
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
