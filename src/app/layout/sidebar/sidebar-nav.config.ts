import {
  LucideActivity,
  LucideBarChart3,
  LucideBuilding,
  LucideCalendar,
  LucideChartLine,
  LucideChartPie,
  LucideClipboardList,
  LucideClock,
  LucideIcon,
  LucideLayoutGrid,
  LucideMap,
  LucideMessagesSquare,
  LucideNavigation,
  LucideRotateCcw,
  LucideSquarePlus,
  LucideSquareX,
  LucideTruck,
  LucideUserPlus,
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
  {
    titleKey: 'nav.sections.vendorsClients',
    items: [
      { labelKey: 'nav.vendorDirectory', route: '/vendors', icon: LucideBuilding, exact: true },
      { labelKey: 'nav.addVendor', route: '/vendors/add', icon: LucideUserPlus },
      { labelKey: 'nav.clientsList', route: '/clients', icon: LucideUsers, exact: true },
      { labelKey: 'nav.clientFeedback', route: '/clients/feedback', icon: LucideMessagesSquare },
    ],
  },
  {
    titleKey: 'nav.sections.orders',
    items: [
      { labelKey: 'nav.allOrders', route: '/orders', icon: LucideClipboardList, exact: true },
      { labelKey: 'nav.scheduledDeliveries', route: '/orders/scheduled', icon: LucideCalendar },
      { labelKey: 'nav.returns', route: '/orders/returns', icon: LucideRotateCcw },
      { labelKey: 'nav.cancellations', route: '/orders/cancellations', icon: LucideSquareX },
    ],
  },
  {
    titleKey: 'nav.sections.reports',
    items: [
      {
        labelKey: 'nav.deliveryPerformance',
        route: '/reports/delivery-performance',
        icon: LucideBarChart3,
      },
      { labelKey: 'nav.revenueAnalysis', route: '/reports/revenue', icon: LucideChartLine },
      { labelKey: 'nav.fleetEfficiency', route: '/reports/fleet-efficiency', icon: LucideChartPie },
    ],
  },
];
