import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditFreightUrl } from '../../../../../shared/constants/app-urls';

import type { Freight } from '../data/freight.model';
import { FreightDetail } from './freight.detail';

export function openFreightDetailModal(
  service: DetailModalService,
  router: Router,
  row: Freight,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.freight.detail.title',
      subtitleKey: 'portal.user.features.freight.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: FreightDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditFreightUrl(row.id));
      }
    });
}
