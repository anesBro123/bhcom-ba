import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditCargoUrl } from '../../../../../shared/constants/app-urls';

import type { Cargo } from '../data/cargo.model';
import { CargoDetail } from './cargo.detail';

export function openCargoDetailModal(
  service: DetailModalService,
  router: Router,
  row: Cargo,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.cargo.detail.title',
      subtitleKey: 'portal.user.features.cargo.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: CargoDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditCargoUrl(row.id));
      }
    });
}
