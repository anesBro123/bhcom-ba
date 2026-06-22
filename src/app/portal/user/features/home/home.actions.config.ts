import { LucideSquarePlus } from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  USER_FIND_URL,
} from '../../../../shared/constants/app-urls';
import type { UserEntityTab } from '../../../../shared/constants/user-urls';
import { UserPageIcons } from '../../user-page-icons';

export interface HomeQuickAction {
  titleKey: string;
  descriptionKey: string;
  route: string;
  queryParams?: Record<string, string>;
  icon: LucideIcon;
  entityTab: UserEntityTab;
}

export const HOME_ENTITY_ACTION_GROUPS: HomeQuickAction[][] = [
  [
    {
      titleKey: 'portal.user.nav.findTransport',
      descriptionKey: 'portal.user.features.home.actions.findTransport.description',
      route: USER_FIND_URL,
      queryParams: { tab: 'transport' },
      icon: UserPageIcons.transport,
      entityTab: 'transport',
    },
    {
      titleKey: 'portal.user.nav.offerTransport',
      descriptionKey: 'portal.user.features.home.actions.offerTransport.description',
      route: USER_CREATE_TRANSPORT_URL,
      icon: LucideSquarePlus,
      entityTab: 'transport',
    },
  ],
  [
    {
      titleKey: 'portal.user.nav.findFreight',
      descriptionKey: 'portal.user.features.home.actions.findFreight.description',
      route: USER_FIND_URL,
      queryParams: { tab: 'freight' },
      icon: UserPageIcons.freight,
      entityTab: 'freight',
    },
    {
      titleKey: 'portal.user.nav.offerFreight',
      descriptionKey: 'portal.user.features.home.actions.offerFreight.description',
      route: USER_CREATE_FREIGHT_URL,
      icon: LucideSquarePlus,
      entityTab: 'freight',
    },
  ],
  [
    {
      titleKey: 'portal.user.nav.findWarehouse',
      descriptionKey: 'portal.user.features.home.actions.findWarehouse.description',
      route: USER_FIND_URL,
      queryParams: { tab: 'warehouse' },
      icon: UserPageIcons.warehouse,
      entityTab: 'warehouse',
    },
    {
      titleKey: 'portal.user.nav.offerWarehouse',
      descriptionKey: 'portal.user.features.home.actions.offerWarehouse.description',
      route: USER_CREATE_WAREHOUSE_URL,
      icon: LucideSquarePlus,
      entityTab: 'warehouse',
    },
  ],
];
