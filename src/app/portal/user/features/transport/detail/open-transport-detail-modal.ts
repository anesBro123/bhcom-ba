import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditTransportUrl } from '../../../../../shared/constants/app-urls';

import type { Transport } from '../data/transport.model';
import { TransportDetail } from './transport.detail';

export function openTransportDetailModal(
  service: DetailModalService,
  router: Router,
  row: Transport,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.transport.detail.title',
      subtitleKey: 'portal.user.features.transport.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: TransportDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditTransportUrl(row.id));
      }
    });
}
