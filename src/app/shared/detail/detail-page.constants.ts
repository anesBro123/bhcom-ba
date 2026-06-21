import { LucidePencil, LucideSend, LucideTrash } from '@lucide/angular';

import type { DetailActionDef } from './detail.types';

export const DETAIL_ACTION_SEND_REQUEST = 'sendRequest';
export const DETAIL_ACTION_EDIT = 'edit';
export const DETAIL_ACTION_DELETE = 'delete';

export type DetailPageEntity = 'transport' | 'freight' | 'warehouse';

export function buildDetailPageActions(
  entity: DetailPageEntity,
  options: { isOwnListing: boolean; editRoute?: string },
): DetailActionDef[] {
  if (options.isOwnListing) {
    return [
      {
        id: DETAIL_ACTION_EDIT,
        labelKey: `portal.user.features.${entity}.table.actions.edit`,
        icon: LucidePencil,
        variant: 'primary',
        route: options.editRoute,
      },
      {
        id: DETAIL_ACTION_DELETE,
        labelKey: `portal.user.features.${entity}.table.actions.delete`,
        icon: LucideTrash,
        variant: 'secondary',
        danger: true,
      },
    ];
  }

  return [
    {
      id: DETAIL_ACTION_SEND_REQUEST,
      labelKey: `portal.user.features.${entity}.table.actions.sendRequest`,
      icon: LucideSend,
      variant: 'primary',
    },
  ];
}
