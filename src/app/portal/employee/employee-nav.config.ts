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

export const EMPLOYEE_NAV: NavSection[] = [
  {
    titleKey: 'portal.employee.nav.sections.dashboard',
    items: [
      { labelKey: 'portal.employee.nav.overview', route: '/dashboard', icon: LucideLayoutGrid, exact: true },
      { labelKey: 'portal.employee.nav.liveMap', route: '/dashboard/live-map', icon: LucideMap },
      { labelKey: 'portal.employee.nav.fleetStatus', route: '/dashboard/fleet-status', icon: LucideActivity },
    ],
  },
  {
    titleKey: 'portal.employee.nav.sections.shipments',
    items: [
      { labelKey: 'portal.employee.nav.allShipments', route: '/shipments', icon: LucideTruck, exact: true },
      { labelKey: 'portal.employee.nav.trackShipment', route: '/shipments/track', icon: LucideNavigation },
      { labelKey: 'portal.employee.nav.createShipment', route: '/shipments/create', icon: LucideSquarePlus },
      { labelKey: 'portal.employee.nav.delayedShipments', route: '/shipments/delayed', icon: LucideClock },
    ],
  },
  {
    titleKey: 'portal.employee.nav.sections.fleet',
    items: [
      { labelKey: 'portal.employee.nav.vehicleList', route: '/fleet/vehicles', icon: LucideVan },
      { labelKey: 'portal.employee.nav.createVehicle', route: '/fleet/vehicles/create', icon: LucideSquarePlus },
      { labelKey: 'portal.employee.nav.maintenanceLogs', route: '/fleet/maintenance', icon: LucideWrench },
      { labelKey: 'portal.employee.nav.driverAssignments', route: '/fleet/drivers', icon: LucideUsers },
    ],
  },
  {
    titleKey: 'portal.employee.nav.sections.vendorsClients',
    items: [
      { labelKey: 'portal.employee.nav.vendorDirectory', route: '/vendors', icon: LucideBuilding, exact: true },
      { labelKey: 'portal.employee.nav.addVendor', route: '/vendors/add', icon: LucideUserPlus },
      { labelKey: 'portal.employee.nav.clientsList', route: '/clients', icon: LucideUsers, exact: true },
      { labelKey: 'portal.employee.nav.clientFeedback', route: '/clients/feedback', icon: LucideMessagesSquare },
    ],
  },
  {
    titleKey: 'portal.employee.nav.sections.orders',
    items: [
      { labelKey: 'portal.employee.nav.allOrders', route: '/orders', icon: LucideClipboardList, exact: true },
      { labelKey: 'portal.employee.nav.scheduledDeliveries', route: '/orders/scheduled', icon: LucideCalendar },
      { labelKey: 'portal.employee.nav.returns', route: '/orders/returns', icon: LucideRotateCcw },
      { labelKey: 'portal.employee.nav.cancellations', route: '/orders/cancellations', icon: LucideSquareX },
    ],
  },
  {
    titleKey: 'portal.employee.nav.sections.reports',
    items: [
      {
        labelKey: 'portal.employee.nav.deliveryPerformance',
        route: '/reports/delivery-performance',
        icon: LucideBarChart3,
      },
      { labelKey: 'portal.employee.nav.revenueAnalysis', route: '/reports/revenue', icon: LucideChartLine },
      { labelKey: 'portal.employee.nav.fleetEfficiency', route: '/reports/fleet-efficiency', icon: LucideChartPie },
    ],
  },
];
