import {
  LucideActivity,
  LucideBarChart3,
  LucideBuilding,
  LucideCalendar,
  LucideChartLine,
  LucideChartPie,
  LucideClipboardList,
  LucideClock,
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
import { NavSection } from '../common/models/nav.model';

export const USER_NAV: NavSection[] = [
  {
    titleKey: 'portal.user.nav.sections.dashboard',
    items: [
      { labelKey: 'portal.user.nav.overview', route: '/dashboard', icon: LucideLayoutGrid, exact: true },
      { labelKey: 'portal.user.nav.liveMap', route: '/dashboard/live-map', icon: LucideMap },
      { labelKey: 'portal.user.nav.fleetStatus', route: '/dashboard/fleet-status', icon: LucideActivity },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.shipments',
    items: [
      { labelKey: 'portal.user.nav.allShipments', route: '/shipments', icon: LucideTruck, exact: true },
      { labelKey: 'portal.user.nav.trackShipment', route: '/shipments/track', icon: LucideNavigation },
      { labelKey: 'portal.user.nav.createShipment', route: '/shipments/create', icon: LucideSquarePlus },
      { labelKey: 'portal.user.nav.delayedShipments', route: '/shipments/delayed', icon: LucideClock },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.fleet',
    items: [
      { labelKey: 'portal.user.nav.vehicleList', route: '/fleet/vehicles', icon: LucideVan },
      { labelKey: 'portal.user.nav.createVehicle', route: '/fleet/vehicles/create', icon: LucideSquarePlus },
      { labelKey: 'portal.user.nav.maintenanceLogs', route: '/fleet/maintenance', icon: LucideWrench },
      { labelKey: 'portal.user.nav.driverAssignments', route: '/fleet/drivers', icon: LucideUsers },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.vendorsClients',
    items: [
      { labelKey: 'portal.user.nav.vendorDirectory', route: '/vendors', icon: LucideBuilding, exact: true },
      { labelKey: 'portal.user.nav.addVendor', route: '/vendors/add', icon: LucideUserPlus },
      { labelKey: 'portal.user.nav.clientsList', route: '/clients', icon: LucideUsers, exact: true },
      { labelKey: 'portal.user.nav.clientFeedback', route: '/clients/feedback', icon: LucideMessagesSquare },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.orders',
    items: [
      { labelKey: 'portal.user.nav.allOrders', route: '/orders', icon: LucideClipboardList, exact: true },
      { labelKey: 'portal.user.nav.scheduledDeliveries', route: '/orders/scheduled', icon: LucideCalendar },
      { labelKey: 'portal.user.nav.returns', route: '/orders/returns', icon: LucideRotateCcw },
      { labelKey: 'portal.user.nav.cancellations', route: '/orders/cancellations', icon: LucideSquareX },
    ],
  },
  {
    titleKey: 'portal.user.nav.sections.reports',
    items: [
      {
        labelKey: 'portal.user.nav.deliveryPerformance',
        route: '/reports/delivery-performance',
        icon: LucideBarChart3,
      },
      { labelKey: 'portal.user.nav.revenueAnalysis', route: '/reports/revenue', icon: LucideChartLine },
      { labelKey: 'portal.user.nav.fleetEfficiency', route: '/reports/fleet-efficiency', icon: LucideChartPie },
    ],
  },
];
