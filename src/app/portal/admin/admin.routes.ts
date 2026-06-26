import { Routes } from '@angular/router';
import { AdminHomePageComponent } from './features/home/admin-home-page.component';
import { AdminSettingsPageComponent } from './features/settings/admin-settings-page.component';
import { UserDetailPageComponent } from './features/users/detail/user-detail-page.component';
import { UserFormPageComponent } from './features/users/form/user-form-page.component';
import { VehicleDetailPageComponent } from './features/vehicles/detail/vehicle-detail-page.component';
import { VehicleFormPageComponent } from './features/vehicles/form/vehicle-form-page.component';
import { WarehouseDetailPageComponent } from './features/warehouses/detail/warehouse-detail-page.component';
import { WarehouseFormPageComponent } from './features/warehouses/form/warehouse-form-page.component';

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: AdminHomePageComponent,
    data: { titleKey: 'portal.admin.pages.home.title' },
  },
  {
    path: 'settings',
    component: AdminSettingsPageComponent,
    data: { titleKey: 'portal.admin.pages.settings.title' },
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
    path: 'users/:id',
    component: UserDetailPageComponent,
    data: { titleKey: 'portal.admin.pages.viewUser.title' },
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
    path: 'vehicles/:id',
    component: VehicleDetailPageComponent,
    data: { titleKey: 'portal.admin.pages.viewVehicle.title' },
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
  {
    path: 'warehouses/:id',
    component: WarehouseDetailPageComponent,
    data: { titleKey: 'portal.admin.pages.viewWarehouse.title' },
  },
] satisfies Routes;
