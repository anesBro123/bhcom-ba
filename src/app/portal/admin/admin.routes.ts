import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder/page-placeholder.component';
import { ADMIN_PORTAL_CONFIG } from './admin-portal.config';
import { VehicleFormPageComponent } from './features/vehicles/form/vehicle-form-page.component';
import { VehicleTablePageComponent } from './features/vehicles/table/vehicle-table-page.component';

export default [
  {
    path: '',
    component: PortalShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: ADMIN_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.admin.dashboard' },
      },
      {
        path: 'users',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.admin.users' },
      },
      {
        path: 'settings',
        component: PagePlaceholderComponent,
        data: { titleKey: 'pages.admin.settings' },
      },
      {
        path: 'vehicles',
        component: VehicleTablePageComponent,
        data: { titleKey: 'pages.admin.vehicles' },
      },
      {
        path: 'vehicles/create',
        component: VehicleFormPageComponent,
        data: { titleKey: 'pages.admin.createVehicle' },
      },
      {
        path: 'vehicles/:id/edit',
        component: VehicleFormPageComponent,
        data: { titleKey: 'pages.admin.editVehicle' },
      },
    ],
  },
] satisfies Routes;
