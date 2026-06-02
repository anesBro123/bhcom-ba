import { Routes } from '@angular/router';
import { EMPLOYEE_PORTAL_CONFIG, PORTAL_CONFIG } from '../core/portal';
import { CreateVehiclePageComponent } from '../features/employee/fleet/vehicles/create-vehicle-page.component';
import { CreateShipmentPageComponent } from '../features/employee/shipments/create-shipment/create-shipment-page.component';
import { ShipmentsPageComponent } from '../features/employee/shipments/shipments-page.component';
import { AppShellComponent } from '../layout/app-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder.component';

export default [
  {
    path: '',
    component: AppShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: EMPLOYEE_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.dashboardOverview' },
      },
      {
        path: 'dashboard/live-map',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.liveMap' },
      },
      {
        path: 'dashboard/fleet-status',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.fleetStatus' },
      },
      {
        path: 'shipments',
        component: ShipmentsPageComponent,
      },
      {
        path: 'shipments/track',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.trackShipment' },
      },
      {
        path: 'shipments/create',
        component: CreateShipmentPageComponent,
      },
      {
        path: 'shipments/delayed',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.delayedShipments' },
      },
      {
        path: 'fleet/vehicles',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.vehicleList' },
      },
      {
        path: 'fleet/vehicles/create',
        component: CreateVehiclePageComponent,
      },
      {
        path: 'fleet/maintenance',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.maintenanceLogs' },
      },
      {
        path: 'fleet/drivers',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.driverAssignments' },
      },
      {
        path: 'vendors',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.vendorDirectory' },
      },
      {
        path: 'vendors/add',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.addVendor' },
      },
      {
        path: 'clients',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.clientsList' },
      },
      {
        path: 'clients/feedback',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.clientFeedback' },
      },
      {
        path: 'orders',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.allOrders' },
      },
      {
        path: 'orders/scheduled',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.scheduledDeliveries' },
      },
      {
        path: 'orders/returns',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.returns' },
      },
      {
        path: 'orders/cancellations',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.cancellations' },
      },
      {
        path: 'reports/delivery-performance',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.deliveryPerformance' },
      },
      {
        path: 'reports/revenue',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.revenueAnalysis' },
      },
      {
        path: 'reports/fleet-efficiency',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.fleetEfficiency' },
      },
    ],
  },
] satisfies Routes;
