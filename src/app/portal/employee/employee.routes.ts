import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder/page-placeholder.component';
import { CreateVehiclePageComponent } from './features/fleet/vehicles/create-vehicle-page.component';
import { CreateShipmentPageComponent } from './features/shipments/create-shipment/create-shipment-page.component';
import { ShipmentsPageComponent } from './features/shipments/shipments-page.component';
import { EMPLOYEE_PORTAL_CONFIG } from './employee-portal.config';

export default [
  {
    path: '',
    component: PortalShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: EMPLOYEE_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.dashboardOverview' },
      },
      {
        path: 'dashboard/live-map',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.liveMap' },
      },
      {
        path: 'dashboard/fleet-status',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.fleetStatus' },
      },
      {
        path: 'shipments',
        component: ShipmentsPageComponent,
      },
      {
        path: 'shipments/track',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.trackShipment' },
      },
      {
        path: 'shipments/create',
        component: CreateShipmentPageComponent,
      },
      {
        path: 'shipments/delayed',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.delayedShipments' },
      },
      {
        path: 'fleet/vehicles',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.vehicleList' },
      },
      {
        path: 'fleet/vehicles/create',
        component: CreateVehiclePageComponent,
      },
      {
        path: 'fleet/maintenance',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.maintenanceLogs' },
      },
      {
        path: 'fleet/drivers',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.driverAssignments' },
      },
      {
        path: 'vendors',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.vendorDirectory' },
      },
      {
        path: 'vendors/add',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.addVendor' },
      },
      {
        path: 'clients',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.clientsList' },
      },
      {
        path: 'clients/feedback',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.clientFeedback' },
      },
      {
        path: 'orders',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.allOrders' },
      },
      {
        path: 'orders/scheduled',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.scheduledDeliveries' },
      },
      {
        path: 'orders/returns',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.returns' },
      },
      {
        path: 'orders/cancellations',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.cancellations' },
      },
      {
        path: 'reports/delivery-performance',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.deliveryPerformance' },
      },
      {
        path: 'reports/revenue',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.revenueAnalysis' },
      },
      {
        path: 'reports/fleet-efficiency',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.employee.pages.fleetEfficiency' },
      },
    ],
  },
] satisfies Routes;
