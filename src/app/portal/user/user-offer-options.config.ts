import type { LucideIcon } from '@lucide/angular';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
} from '../../shared/constants/app-urls';
import type { UserEntityTab } from '../../shared/constants/user-urls';
import { UserPageIcons } from './user-page-icons';

export interface UserOfferOption {
  entityTab: UserEntityTab;
  labelKey: string;
  icon: LucideIcon;
  createUrl: string;
}

export function userCreateListingLabelKey(tab: UserEntityTab): string {
  switch (tab) {
    case 'freight':
      return 'portal.user.pages.createFreight.title';
    case 'warehouse':
      return 'portal.user.pages.createWarehouse.title';
    default:
      return 'portal.user.pages.createTransport.title';
  }
}

export const USER_OFFER_OPTIONS: UserOfferOption[] = [
  {
    entityTab: 'transport',
    labelKey: userCreateListingLabelKey('transport'),
    icon: UserPageIcons.transport,
    createUrl: USER_CREATE_TRANSPORT_URL,
  },
  {
    entityTab: 'freight',
    labelKey: userCreateListingLabelKey('freight'),
    icon: UserPageIcons.freight,
    createUrl: USER_CREATE_FREIGHT_URL,
  },
  {
    entityTab: 'warehouse',
    labelKey: userCreateListingLabelKey('warehouse'),
    icon: UserPageIcons.warehouse,
    createUrl: USER_CREATE_WAREHOUSE_URL,
  },
];
