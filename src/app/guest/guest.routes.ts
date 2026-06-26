import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { AdminLoginPageComponent } from './pages/admin-login/admin-login-page.component';
import { PortalPickerPageComponent } from './pages/portal-picker/portal-picker-page.component';
import { RegisterCompanyPageComponent } from './pages/register/register-company-page.component';
import { UserLoginPageComponent } from './pages/user-login/user-login-page.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    component: PortalPickerPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    component: UserLoginPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterCompanyPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'admin/login',
    component: AdminLoginPageComponent,
    canActivate: [guestGuard],
  },
] satisfies Routes;
