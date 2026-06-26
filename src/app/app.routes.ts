import { Routes } from '@angular/router';
import { AppShellComponent } from './shared/shell/app-shell/app-shell.component';
import { portalMatchGuard } from './portal/guards/portal-match.guard';
import { PORTAL_CONFIG } from './portal/common/models/portal-config.model';
import { ADMIN_PORTAL_CONFIG } from './portal/admin/admin-portal.config';
import { USER_PORTAL_CONFIG } from './portal/user/user-portal.config';
import guestRoutes from './guest/guest.routes';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      ...guestRoutes,
      {
        path: 'admin',
        canMatch: [portalMatchGuard('admin')],
        providers: [{ provide: PORTAL_CONFIG, useValue: ADMIN_PORTAL_CONFIG }],
        loadChildren: () => import('./portal/admin/admin.routes'),
      },
      {
        path: '',
        canMatch: [portalMatchGuard('user')],
        providers: [{ provide: PORTAL_CONFIG, useValue: USER_PORTAL_CONFIG }],
        loadChildren: () => import('./portal/user/user.routes'),
      },
    ],
  },
];
