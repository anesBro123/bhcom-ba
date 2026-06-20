import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditWarehouseUrl } from '../../../../../shared/constants/app-urls';

import type { Warehouse } from '../data/warehouse.model';
import { WarehouseDetail } from './warehouse.detail';

export function openWarehouseDetailModal(
  service: DetailModalService,
  router: Router,
  row: Warehouse,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.warehouse.detail.title',
      subtitleKey: 'portal.user.features.warehouse.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: WarehouseDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditWarehouseUrl(row.id));
      }
    });
}
