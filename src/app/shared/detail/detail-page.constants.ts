import { LucidePencil, LucideSend, LucideTrash } from '@lucide/angular';

import type { DetailActionDef } from './detail.types';

export const DETAIL_ACTION_SEND_REQUEST = 'sendRequest';
export const DETAIL_ACTION_EDIT = 'edit';
export const DETAIL_ACTION_DELETE = 'delete';

export type DetailPageEntity = 'transport' | 'freight' | 'warehouse';

export type AdminDetailPageEntity = 'users' | 'vehicles' | 'warehouses';

export function buildDetailPageActions(
  portal: 'user',
  entity: DetailPageEntity,
  options: { isOwnListing: boolean; editRoute?: string },
): DetailActionDef[];
export function buildDetailPageActions(
  portal: 'admin',
  entity: AdminDetailPageEntity,
  options: { editRoute: string },
): DetailActionDef[];
export function buildDetailPageActions(
  portal: 'user' | 'admin',
  entity: DetailPageEntity | AdminDetailPageEntity,
  options: { isOwnListing?: boolean; editRoute?: string },
): DetailActionDef[] {
  if (portal === 'admin') {
    const adminEntity = entity as AdminDetailPageEntity;
    return [
      {
        id: DETAIL_ACTION_EDIT,
        labelKey: `portal.admin.features.${adminEntity}.table.actions.edit`,
        icon: LucidePencil,
        variant: 'primary',
        route: options.editRoute,
      },
      {
        id: DETAIL_ACTION_DELETE,
        labelKey: `portal.admin.features.${adminEntity}.table.actions.delete`,
        icon: LucideTrash,
        variant: 'secondary',
        danger: true,
      },
    ];
  }

  const userEntity = entity as DetailPageEntity;
  if (options.isOwnListing) {
    return [
      {
        id: DETAIL_ACTION_EDIT,
        labelKey: `portal.user.features.${userEntity}.table.actions.edit`,
        icon: LucidePencil,
        variant: 'primary',
        route: options.editRoute,
      },
      {
        id: DETAIL_ACTION_DELETE,
        labelKey: `portal.user.features.${userEntity}.table.actions.delete`,
        icon: LucideTrash,
        variant: 'secondary',
        danger: true,
      },
    ];
  }

  return [
    {
      id: DETAIL_ACTION_SEND_REQUEST,
      labelKey: `portal.user.features.${userEntity}.table.actions.sendRequest`,
      icon: LucideSend,
      variant: 'primary',
    },
  ];
}

/** @deprecated Use buildDetailPageActions('admin', entity, { editRoute }) */
export function buildAdminDetailPageActions(
  entity: AdminDetailPageEntity,
  options: { editRoute: string },
): DetailActionDef[] {
  return buildDetailPageActions('admin', entity, options);
}
