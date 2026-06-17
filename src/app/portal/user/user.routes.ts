import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { CargoFormPageComponent } from './features/cargo/form/cargo-form-page.component';
import { CargoAllTablePageComponent } from './features/cargo/table-all/cargo-all-table-page.component';
import { CargoMyTablePageComponent } from './features/cargo/table-my/cargo-my-table-page.component';
import { UserDashboardPageComponent } from './features/dashboard/user-dashboard-page.component';
import { RouteFormPageComponent } from './features/routes/form/route-form-page.component';
import { RouteAllTablePageComponent } from './features/routes/table-all/route-all-table-page.component';
import { RouteMyTablePageComponent } from './features/routes/table-my/route-my-table-page.component';
import { StorageFormPageComponent } from './features/storage/form/storage-form-page.component';
import { StorageAllTablePageComponent } from './features/storage/table-all/storage-all-table-page.component';
import { StorageMyTablePageComponent } from './features/storage/table-my/storage-my-table-page.component';
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
        path: 'routes/mine',
        component: RouteMyTablePageComponent,
        data: { titleKey: 'portal.user.pages.myRoutes.title' },
      },
      {
        path: 'routes',
        component: RouteAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.allRoutes.title' },
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
        path: 'cargo/mine',
        component: CargoMyTablePageComponent,
        data: { titleKey: 'portal.user.pages.myCargo.title' },
      },
      {
        path: 'cargo',
        component: CargoAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.allCargo.title' },
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
        path: 'storage/mine',
        component: StorageMyTablePageComponent,
        data: { titleKey: 'portal.user.pages.myStorage.title' },
      },
      {
        path: 'storage',
        component: StorageAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.allStorage.title' },
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
