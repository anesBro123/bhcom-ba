import type { EntityTabConfig } from '../../shared/ui/entity-tabs/entity-tabs.component';
import type { AdminEntityTab } from '../../shared/constants/admin-urls';
import { AdminPageIcons } from './admin-page-icons';

export const ADMIN_ENTITY_TAB_CONFIG: EntityTabConfig<AdminEntityTab>[] = [
  {
    id: 'users',
    labelKey: 'portal.admin.features.adminEntityTabs.users',
    icon: AdminPageIcons.users,
  },
  {
    id: 'vehicles',
    labelKey: 'portal.admin.features.adminEntityTabs.vehicles',
    icon: AdminPageIcons.vehicles,
  },
  {
    id: 'warehouses',
    labelKey: 'portal.admin.features.adminEntityTabs.warehouses',
    icon: AdminPageIcons.warehouses,
  },
];
