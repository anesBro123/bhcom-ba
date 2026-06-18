import { LucidePencil, LucideX } from '@lucide/angular';

import type { DetailActionDef } from './detail-modal.types';

export const DETAIL_MODAL_CLOSE_LABEL_KEY = 'shared.detailModal.common.close';
export const DETAIL_MODAL_EDIT_LABEL_KEY = 'shared.detailModal.common.edit';

export const DETAIL_MODAL_CLOSE_ACTION_ID = 'close';
export const DETAIL_MODAL_EDIT_ACTION_ID = 'edit';

const CLOSE_ACTION: DetailActionDef = {
  id: DETAIL_MODAL_CLOSE_ACTION_ID,
  labelKey: DETAIL_MODAL_CLOSE_LABEL_KEY,
  icon: LucideX,
  variant: 'primary',
};

const EDIT_ACTION: DetailActionDef = {
  id: DETAIL_MODAL_EDIT_ACTION_ID,
  labelKey: DETAIL_MODAL_EDIT_LABEL_KEY,
  icon: LucidePencil,
  variant: 'secondary',
};

export type DetailModalScope = 'all' | 'my';

export function buildDetailModalActions(scope: DetailModalScope): DetailActionDef[] {
  return scope === 'my' ? [EDIT_ACTION, CLOSE_ACTION] : [CLOSE_ACTION];
}
