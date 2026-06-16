import { Routes } from '@angular/router';
import { portalMatchGuard } from './portal/guards/portal-match.guard';
import guestRoutes from './guest/guest.routes';

export const routes: Routes = [
  ...guestRoutes,
  {
    path: 'admin',
    canMatch: [portalMatchGuard('admin')],
    loadChildren: () => import('./portal/admin/admin.routes'),
  },
  {
    path: '',
    canMatch: [portalMatchGuard('user')],
    loadChildren: () => import('./portal/user/user.routes'),
  },
];
