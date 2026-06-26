import type { LucideIcon } from '@lucide/angular';

import type { AdminEntityTab } from '../../shared/constants/admin-urls';
import {
  ADMIN_CREATE_USER_URL,
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_CREATE_WAREHOUSE_URL,
} from '../../shared/constants/app-urls';
import { AdminPageIcons } from './admin-page-icons';

export interface AdminCreateOption {
  entityTab: AdminEntityTab;
  labelKey: string;
  icon: LucideIcon;
  createUrl: string;
}

export const ADMIN_CREATE_OPTIONS: AdminCreateOption[] = [
  {
    entityTab: 'users',
    labelKey: 'portal.admin.nav.createUser',
    icon: AdminPageIcons.users,
    createUrl: ADMIN_CREATE_USER_URL,
  },
  {
    entityTab: 'vehicles',
    labelKey: 'portal.admin.nav.createVehicle',
    icon: AdminPageIcons.vehicles,
    createUrl: ADMIN_CREATE_VEHICLE_URL,
  },
  {
    entityTab: 'warehouses',
    labelKey: 'portal.admin.nav.createWarehouse',
    icon: AdminPageIcons.warehouses,
    createUrl: ADMIN_CREATE_WAREHOUSE_URL,
  },
];
