import { LucideLayoutGrid, LucideSettings, LucideUsers } from '@lucide/angular';
import { NavSection } from './nav.model';

export const ADMIN_NAV: NavSection[] = [
  {
    titleKey: 'nav.admin.sections.main',
    items: [
      {
        labelKey: 'nav.admin.dashboard',
        route: '/admin/dashboard',
        icon: LucideLayoutGrid,
        exact: true,
      },
      { labelKey: 'nav.admin.users', route: '/admin/users', icon: LucideUsers },
      { labelKey: 'nav.admin.settings', route: '/admin/settings', icon: LucideSettings },
    ],
  },
];
