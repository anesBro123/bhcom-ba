import { Routes } from '@angular/router';
import { AdminDashboardPageComponent } from './features/dashboard/admin-dashboard-page.component';
import { AdminSettingsPageComponent } from './features/settings/admin-settings-page.component';
import { UserFormPageComponent } from './features/users/form/user-form-page.component';
import { UserTablePageComponent } from './features/users/table/user-table-page.component';
import { VehicleFormPageComponent } from './features/vehicles/form/vehicle-form-page.component';
import { VehicleTablePageComponent } from './features/vehicles/table/vehicle-table-page.component';
import { WarehouseFormPageComponent } from './features/warehouses/form/warehouse-form-page.component';
import { WarehouseTablePageComponent } from './features/warehouses/table/warehouse-table-page.component';

export default [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminDashboardPageComponent,
    data: { titleKey: 'portal.admin.pages.dashboard.title' },
  },
  {
    path: 'settings',
    component: AdminSettingsPageComponent,
    data: { titleKey: 'portal.admin.pages.settings.title' },
  },
  {
    path: 'users',
    component: UserTablePageComponent,
    data: { titleKey: 'portal.admin.pages.users.title' },
  },
  {
    path: 'users/create',
    component: UserFormPageComponent,
    data: { titleKey: 'portal.admin.pages.createUser.title' },
  },
  {
    path: 'users/:id/edit',
    component: UserFormPageComponent,
    data: { titleKey: 'portal.admin.pages.editUser.title' },
  },
  {
    path: 'vehicles',
    component: VehicleTablePageComponent,
    data: { titleKey: 'portal.admin.pages.vehicles.title' },
  },
  {
    path: 'vehicles/create',
    component: VehicleFormPageComponent,
    data: { titleKey: 'portal.admin.pages.createVehicle.title' },
  },
  {
    path: 'vehicles/:id/edit',
    component: VehicleFormPageComponent,
    data: { titleKey: 'portal.admin.pages.editVehicle.title' },
  },
  {
    path: 'warehouses',
    component: WarehouseTablePageComponent,
    data: { titleKey: 'portal.admin.pages.warehouses.title' },
  },
  {
    path: 'warehouses/create',
    component: WarehouseFormPageComponent,
    data: { titleKey: 'portal.admin.pages.createWarehouse.title' },
  },
  {
    path: 'warehouses/:id/edit',
    component: WarehouseFormPageComponent,
    data: { titleKey: 'portal.admin.pages.editWarehouse.title' },
  },
] satisfies Routes;
