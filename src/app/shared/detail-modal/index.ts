export { defineDetail } from './define-detail';
export { DetailModalService } from './detail-modal.service';
export { DetailModalComponent } from './detail-modal/detail-modal.component';
export { DetailViewComponent } from './detail-view/detail-view.component';
export {
  buildDetailModalActions,
  DETAIL_MODAL_CLOSE_ACTION_ID,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DETAIL_MODAL_CLOSE_LABEL_KEY,
  DETAIL_MODAL_EDIT_LABEL_KEY,
} from './detail-modal.constants';
export type { DetailModalScope } from './detail-modal.constants';
export type {
  DetailActionDef,
  DetailDefinition,
  DetailFieldDef,
  DetailModalOptions,
  DetailModalResult,
  DetailSectionDef,
} from './detail-modal.types';
