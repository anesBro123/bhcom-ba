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
        data: { title: 'Dashboard Overview' },
      },
      {
        path: 'dashboard/live-map',
        component: PagePlaceholderComponent,
        data: { title: 'Live Shipment Map' },
      },
      {
        path: 'dashboard/fleet-status',
        component: PagePlaceholderComponent,
        data: { title: 'Fleet Status' },
      },
      {
        path: 'shipments',
        component: PagePlaceholderComponent,
        data: { title: 'All Shipments' },
      },
      {
        path: 'shipments/track',
        component: PagePlaceholderComponent,
        data: { title: 'Track Shipment' },
      },
      {
        path: 'shipments/create',
        component: PagePlaceholderComponent,
        data: { title: 'Create Shipment' },
      },
      {
        path: 'shipments/delayed',
        component: PagePlaceholderComponent,
        data: { title: 'Delayed Shipments' },
      },
      {
        path: 'fleet/vehicles',
        component: PagePlaceholderComponent,
        data: { title: 'Vehicle List' },
      },
      {
        path: 'fleet/maintenance',
        component: PagePlaceholderComponent,
        data: { title: 'Maintenance Logs' },
      },
      {
        path: 'fleet/drivers',
        component: PagePlaceholderComponent,
        data: { title: 'Driver Assignments' },
      },
    ],
  },
];
