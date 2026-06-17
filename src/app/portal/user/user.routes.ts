import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { CargoFormPageComponent } from './features/cargo/form/cargo-form-page.component';
import { CargoTablePageComponent } from './features/cargo/table/cargo-table-page.component';
import { UserDashboardPageComponent } from './features/dashboard/user-dashboard-page.component';
import { RouteFormPageComponent } from './features/routes/form/route-form-page.component';
import { RouteTablePageComponent } from './features/routes/table/route-table-page.component';
import { StorageFormPageComponent } from './features/storage/form/storage-form-page.component';
import { StorageTablePageComponent } from './features/storage/table/storage-table-page.component';
import { USER_PORTAL_CONFIG } from './user-portal.config';

export default [
  {
    path: '',
    component: PortalShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: USER_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: UserDashboardPageComponent,
        data: { titleKey: 'portal.user.pages.dashboard.title' },
      },
      {
        path: 'routes',
        component: RouteTablePageComponent,
        data: { titleKey: 'portal.user.pages.routes.title' },
      },
      {
        path: 'routes/create',
        component: RouteFormPageComponent,
        data: { titleKey: 'portal.user.pages.createRoute.title' },
      },
      {
        path: 'routes/:id/edit',
        component: RouteFormPageComponent,
        data: { titleKey: 'portal.user.pages.editRoute.title' },
      },
      {
        path: 'cargo',
        component: CargoTablePageComponent,
        data: { titleKey: 'portal.user.pages.cargo.title' },
      },
      {
        path: 'cargo/create',
        component: CargoFormPageComponent,
        data: { titleKey: 'portal.user.pages.createCargo.title' },
      },
      {
        path: 'cargo/:id/edit',
        component: CargoFormPageComponent,
        data: { titleKey: 'portal.user.pages.editCargo.title' },
      },
      {
        path: 'storage',
        component: StorageTablePageComponent,
        data: { titleKey: 'portal.user.pages.storage.title' },
      },
      {
        path: 'storage/create',
        component: StorageFormPageComponent,
        data: { titleKey: 'portal.user.pages.createStorage.title' },
      },
      {
        path: 'storage/:id/edit',
        component: StorageFormPageComponent,
        data: { titleKey: 'portal.user.pages.editStorage.title' },
      },
    ],
  },
] satisfies Routes;
