import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell.component';
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
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.allShipments' },
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
    ],
  },
];
