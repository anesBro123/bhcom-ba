import { Routes } from '@angular/router';
import {
  ADMIN_PORTAL_CONFIG,
  EMPLOYEE_PORTAL_CONFIG,
  guestGuard,
  portalMatchGuard,
  PORTAL_CONFIG,
} from './core/portal';
import { LoginPageComponent } from './pages/login/login-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [guestGuard],
    providers: [{ provide: PORTAL_CONFIG, useValue: EMPLOYEE_PORTAL_CONFIG }],
  },
  {
    path: 'admin/login',
    component: LoginPageComponent,
    canActivate: [guestGuard],
    providers: [{ provide: PORTAL_CONFIG, useValue: ADMIN_PORTAL_CONFIG }],
  },
  {
    path: 'admin',
    canMatch: [portalMatchGuard('admin')],
    loadChildren: () => import('./routes/admin.routes'),
  },
  {
    path: '',
    canMatch: [portalMatchGuard('employee')],
    loadChildren: () => import('./routes/employee.routes'),
  },
];
