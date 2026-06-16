import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { AdminLoginPageComponent } from './pages/login/admin-login-page.component';
import { UserLoginPageComponent } from './pages/login/user-login-page.component';
import { LandingPageComponent } from './pages/landing/landing-page.component';
import { RegisterCompanyPageComponent } from './pages/register/register-company-page.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';
import { GuestShellComponent } from './shell/guest-shell/guest-shell.component';

export default [
  {
    path: '',
    component: GuestShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
        canActivate: [guestGuard],
        data: { showFooter: true, showNavActions: true },
      },
      {
        path: 'sign-in',
        component: SignInPageComponent,
        canActivate: [guestGuard],
        data: { showNavActions: true },
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
    ],
  },
  {
    path: 'admin',
    component: GuestShellComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginPageComponent,
        canActivate: [guestGuard],
      },
    ],
  },
] satisfies Routes;
