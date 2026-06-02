import { Routes } from '@angular/router';
import { ADMIN_PORTAL_CONFIG, PORTAL_CONFIG } from '../core/portal';
import { AppShellComponent } from '../layout/app-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder.component';

export default [
  {
    path: '',
    component: AppShellComponent,
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
    ],
  },
] satisfies Routes;
