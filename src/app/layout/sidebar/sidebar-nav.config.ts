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
  label: string;
  route: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const SIDEBAR_NAV: NavSection[] = [
  {
    title: 'DASHBOARD',
    items: [
      { label: 'Overview', route: '/dashboard', icon: LucideLayoutGrid, exact: true },
      { label: 'Live Shipment Map', route: '/dashboard/live-map', icon: LucideMap },
      { label: 'Fleet Status', route: '/dashboard/fleet-status', icon: LucideActivity },
    ],
  },
  {
    title: 'SHIPMENTS',
    items: [
      { label: 'All Shipments', route: '/shipments', icon: LucideTruck, exact: true },
      { label: 'Track Shipment', route: '/shipments/track', icon: LucideNavigation },
      { label: 'Create Shipment', route: '/shipments/create', icon: LucideSquarePlus },
      { label: 'Delayed Shipments', route: '/shipments/delayed', icon: LucideClock },
    ],
  },
  {
    title: 'FLEET MANAGEMENT',
    items: [
      { label: 'Vehicle List', route: '/fleet/vehicles', icon: LucideVan },
      { label: 'Maintenance Logs', route: '/fleet/maintenance', icon: LucideWrench },
      { label: 'Driver Assignments', route: '/fleet/drivers', icon: LucideUsers },
    ],
  },
];
