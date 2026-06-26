export { defineDetail } from './define-detail';
export { DetailViewComponent } from './detail-view/detail-view.component';
export {
  buildAdminDetailPageActions,
  buildDetailPageActions,
  DETAIL_ACTION_DELETE,
  DETAIL_ACTION_EDIT,
  DETAIL_ACTION_SEND_REQUEST,
} from './detail-page.constants';
export type { AdminDetailPageEntity, DetailPageEntity } from './detail-page.constants';
export type {
  DetailActionDef,
  DetailDefinition,
  DetailFieldDef,
  DetailSectionDef,
} from './detail.types';
