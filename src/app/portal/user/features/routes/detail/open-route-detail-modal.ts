import { Router } from '@angular/router';
import { take } from 'rxjs';

import {
  buildDetailModalActions,
  DETAIL_MODAL_EDIT_ACTION_ID,
  DetailModalService,
  type DetailModalScope,
} from '../../../../../shared/detail-modal';
import { userEditRouteUrl } from '../../../../../shared/constants/app-urls';

import type { Route } from '../data/route.model';
import { RouteDetail } from './route.detail';

export function openRouteDetailModal(
  service: DetailModalService,
  router: Router,
  row: Route,
  scope: DetailModalScope,
): void {
  service
    .open({
      titleKey: 'portal.user.features.routes.detail.title',
      subtitleKey: 'portal.user.features.routes.detail.subtitle',
      subtitleParams: { id: row.id },
      definition: RouteDetail,
      data: row,
      actions: buildDetailModalActions(scope),
    })
    .pipe(take(1))
    .subscribe((result) => {
      if (result.actionId === DETAIL_MODAL_EDIT_ACTION_ID) {
        void router.navigateByUrl(userEditRouteUrl(row.id));
      }
    });
}
