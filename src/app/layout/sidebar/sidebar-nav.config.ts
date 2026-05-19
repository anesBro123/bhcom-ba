import {
  LucideActivity,
  LucideClock,
  LucideIcon,
  LucideLayoutGrid,
  LucideMap,
  LucideNavigation,
  LucideSquarePlus,
  LucideTruck,
  LucideUsers,
  LucideVan,
  LucideWrench,
} from '@lucide/angular';

export interface NavItem {
  labelKey: string;
  route: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface NavSection {
  titleKey: string;
  items: NavItem[];
}

export const SIDEBAR_NAV: NavSection[] = [
  {
    titleKey: 'nav.sections.dashboard',
    items: [
      { labelKey: 'nav.overview', route: '/dashboard', icon: LucideLayoutGrid, exact: true },
      { labelKey: 'nav.liveMap', route: '/dashboard/live-map', icon: LucideMap },
      { labelKey: 'nav.fleetStatus', route: '/dashboard/fleet-status', icon: LucideActivity },
    ],
  },
  {
    titleKey: 'nav.sections.shipments',
    items: [
      { labelKey: 'nav.allShipments', route: '/shipments', icon: LucideTruck, exact: true },
      { labelKey: 'nav.trackShipment', route: '/shipments/track', icon: LucideNavigation },
      { labelKey: 'nav.createShipment', route: '/shipments/create', icon: LucideSquarePlus },
      { labelKey: 'nav.delayedShipments', route: '/shipments/delayed', icon: LucideClock },
    ],
  },
  {
    titleKey: 'nav.sections.fleet',
    items: [
      { labelKey: 'nav.vehicleList', route: '/fleet/vehicles', icon: LucideVan },
      { labelKey: 'nav.maintenanceLogs', route: '/fleet/maintenance', icon: LucideWrench },
      { labelKey: 'nav.driverAssignments', route: '/fleet/drivers', icon: LucideUsers },
    ],
  },
];
