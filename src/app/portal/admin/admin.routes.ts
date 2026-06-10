import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder/page-placeholder.component';
import { ADMIN_PORTAL_CONFIG } from './admin-portal.config';
import { EmployeeFormPageComponent } from './features/employees/form/employee-form-page.component';
import { EmployeeTablePageComponent } from './features/employees/table/employee-table-page.component';
import { VehicleFormPageComponent } from './features/vehicles/form/vehicle-form-page.component';
import { VehicleTablePageComponent } from './features/vehicles/table/vehicle-table-page.component';
import { WarehouseFormPageComponent } from './features/warehouses/form/warehouse-form-page.component';
import { WarehouseTablePageComponent } from './features/warehouses/table/warehouse-table-page.component';

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
        data: { titleKey: 'portal.admin.pages.dashboard' },
      },
      {
        path: 'settings',
        component: PagePlaceholderComponent,
        data: { titleKey: 'portal.admin.pages.settings' },
      },
      {
        path: 'employees',
        component: EmployeeTablePageComponent,
        data: { titleKey: 'portal.admin.pages.employees' },
      },
      {
        path: 'employees/create',
        component: EmployeeFormPageComponent,
        data: { titleKey: 'portal.admin.pages.createEmployee' },
      },
      {
        path: 'employees/:id/edit',
        component: EmployeeFormPageComponent,
        data: { titleKey: 'portal.admin.pages.editEmployee' },
      },
      {
        path: 'vehicles',
        component: VehicleTablePageComponent,
        data: { titleKey: 'portal.admin.pages.vehicles' },
      },
      {
        path: 'vehicles/create',
        component: VehicleFormPageComponent,
        data: { titleKey: 'portal.admin.pages.createVehicle' },
      },
      {
        path: 'vehicles/:id/edit',
        component: VehicleFormPageComponent,
        data: { titleKey: 'portal.admin.pages.editVehicle' },
      },
      {
        path: 'warehouses',
        component: WarehouseTablePageComponent,
        data: { titleKey: 'portal.admin.pages.warehouses' },
      },
      {
        path: 'warehouses/create',
        component: WarehouseFormPageComponent,
        data: { titleKey: 'portal.admin.pages.createWarehouse' },
      },
      {
        path: 'warehouses/:id/edit',
        component: WarehouseFormPageComponent,
        data: { titleKey: 'portal.admin.pages.editWarehouse' },
      },
    ],
  },
] satisfies Routes;
