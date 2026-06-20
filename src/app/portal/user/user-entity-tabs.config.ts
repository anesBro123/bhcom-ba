import type { EntityTabConfig } from '../../shared/ui/entity-tabs/entity-tabs.component';
import { UserPageIcons } from './user-page-icons';

export const USER_ENTITY_TAB_CONFIG: EntityTabConfig[] = [
  {
    id: 'transport',
    labelKey: 'portal.user.features.entityTabs.transport',
    icon: UserPageIcons.transport,
  },
  {
    id: 'freight',
    labelKey: 'portal.user.features.entityTabs.freight',
    icon: UserPageIcons.freight,
  },
  {
    id: 'warehouse',
    labelKey: 'portal.user.features.entityTabs.warehouse',
    icon: UserPageIcons.warehouse,
  },
];
