import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell.component';
import { ShipmentsPageComponent } from './features/shipments/shipments-page.component';
import { PagePlaceholderComponent } from './pages/page-placeholder.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
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
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.createShipment' },
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
];
