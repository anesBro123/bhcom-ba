import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditStorageUrl } from '../../../../../shared/constants/app-urls';

import type { Storage } from '../data/storage.model';
import { StorageDetail } from './storage.detail';

export function openStorageDetailModal(
  service: DetailModalService,
  router: Router,
  row: Storage,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.storage.detail.title',
      subtitleKey: 'portal.user.features.storage.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: StorageDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditStorageUrl(row.id));
      }
    });
}
