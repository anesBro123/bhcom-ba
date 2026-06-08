import { LucideSquarePlus, LucideTruck } from '@lucide/angular';
import {
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_VEHICLES_URL,
} from '../../shared/constants/app-urls';
import { NavSection } from '../common/models/nav.model';

export const ADMIN_NAV: NavSection[] = [
  {
    titleKey: 'nav.admin.sections.vehicles',
    items: [
      {
        labelKey: 'nav.admin.allVehicles',
        route: ADMIN_VEHICLES_URL,
        icon: LucideTruck,
        exact: true,
      },
      {
        labelKey: 'nav.admin.createVehicle',
        route: ADMIN_CREATE_VEHICLE_URL,
        icon: LucideSquarePlus,
      },
    ],
  },
];
