import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../portal/common/models/portal-config.model';
import { ADMIN_PORTAL_CONFIG } from '../portal/admin/admin-portal.config';
import { EMPLOYEE_PORTAL_CONFIG } from '../portal/employee/employee-portal.config';
import { guestGuard } from './guards/guest.guard';
import { publicGuestGuard } from './guards/public.guest.guard';
import { GuestShellComponent } from './shell/guest-shell/guest-shell.component';
import { LandingPageComponent } from './pages/landing/landing-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';

export default [
  {
    path: '',
    component: GuestShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
        canActivate: [publicGuestGuard],
        data: { showFooter: true, showNavActions: true },
      },
      {
        path: 'sign-in',
        component: SignInPageComponent,
        canActivate: [publicGuestGuard],
        data: { showNavActions: true },
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard],
        providers: [{ provide: PORTAL_CONFIG, useValue: EMPLOYEE_PORTAL_CONFIG }],
      },
    ],
  },
  {
    path: 'admin',
    component: GuestShellComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard],
        providers: [{ provide: PORTAL_CONFIG, useValue: ADMIN_PORTAL_CONFIG }],
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [guestGuard],
        providers: [{ provide: PORTAL_CONFIG, useValue: ADMIN_PORTAL_CONFIG }],
      },
    ],
  },
] satisfies Routes;
