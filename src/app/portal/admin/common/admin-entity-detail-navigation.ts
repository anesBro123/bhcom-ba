import {
  adminHomeUrl,
  type AdminEntityTab,
} from '../../../shared/constants/admin-urls';

import { ADMIN_HOME_BACK_LABEL_KEY } from '../admin-home-navigation';

export function resolveAdminDetailBack(
  tab: AdminEntityTab,
): { url: string; labelKey: string } {
  return { url: adminHomeUrl(tab), labelKey: ADMIN_HOME_BACK_LABEL_KEY };
}

export function resolveAdminDetailSubtitleKey(tab: AdminEntityTab): string {
  switch (tab) {
    case 'vehicles':
      return 'portal.admin.pages.viewVehicle.subtitle';
    case 'warehouses':
      return 'portal.admin.pages.viewWarehouse.subtitle';
    default:
      return 'portal.admin.pages.viewUser.subtitle';
  }
}
