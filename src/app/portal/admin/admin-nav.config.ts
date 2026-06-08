import { LucideSquarePlus, LucideTruck } from '@lucide/angular';
import {
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_VEHICLES_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';

export const ADMIN_NAV: NavSection[] = [
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
];
