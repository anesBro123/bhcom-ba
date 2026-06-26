import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { AuthService } from '../../../../../shared/core/auth/auth.service';
import { ConfirmService } from '../../../../../shared/confirm';
import {
  userEditTransportUrl,
  userSearchUrl,
  userOurListingsUrl,
} from '../../../../../shared/constants/app-urls';
import {
  buildDetailPageActions,
  DETAIL_ACTION_DELETE,
  DETAIL_ACTION_SEND_REQUEST,
  DetailViewComponent,
} from '../../../../../shared/detail';
import { EntityDetailSummaryComponent } from '../../../../../shared/ui/entity-detail-summary/entity-detail-summary.component';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { DetailActionBarComponent } from '../../../../../shared/ui/detail-action-bar/detail-action-bar.component';
import { DetailPageLayoutComponent } from '../../../../../shared/ui/detail-page-layout/detail-page-layout.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import {
  isOwnListingEntity,
  readEntityDetailOrigin,
  resolveDetailBack,
  resolveDetailSubtitleKey,
} from '../../../common/entity-detail-navigation';
import type { Transport } from '../data/transport.model';
import { UserTransportService } from '../data/transport.service';
import { UserPageIcons } from '../../../user-page-icons';
import { TransportDetail } from './transport.detail';

@Component({
  selector: 'app-transport-detail-page',
  imports: [
    TranslatePipe,
    PageBackLinkComponent,
    PageTitleComponent,
    DetailPageLayoutComponent,
    DetailActionBarComponent,
    EntityDetailSummaryComponent,
    DetailViewComponent,
  ],
  templateUrl: './transport-detail-page.component.html',
  styleUrl: './transport-detail-page.component.scss',
})
export class TransportDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly transportService = inject(UserTransportService);
  private readonly authService = inject(AuthService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly TransportDetail = TransportDetail;
  protected readonly pageTitleKey = 'portal.user.pages.viewTransport.title';
  protected readonly pageIcon = UserPageIcons.transport;

  protected readonly entity = signal<Transport | null>(null);
  protected readonly loading = signal(true);
  protected readonly detailOrigin = readEntityDetailOrigin();

  protected readonly isOwnListing = computed(() => {
    const item = this.entity();
    const user = this.authService.user();
    if (!item || !user) {
      return false;
    }

    return isOwnListingEntity(item, user.companyId);
  });

  protected readonly back = computed(() =>
    resolveDetailBack('transport', this.isOwnListing(), this.detailOrigin),
  );

  protected readonly pageSubtitleKey = computed(() =>
    resolveDetailSubtitleKey(this.isOwnListing(), this.detailOrigin),
  );

  protected readonly detailActions = computed(() => {
    const item = this.entity();
    if (!item) {
      return [];
    }

    return buildDetailPageActions('transport', {
      isOwnListing: this.isOwnListing(),
      editRoute: userEditTransportUrl(item.id),
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigateByUrl(userSearchUrl('transport'));
      return;
    }

    this.transportService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          this.entity.set(item);
          this.loading.set(false);
        },
        error: () => {
          void this.router.navigateByUrl(userSearchUrl('transport'));
        },
      });
  }

  protected onDetailAction(actionId: string): void {
    const item = this.entity();
    if (!item) {
      return;
    }

    switch (actionId) {
      case DETAIL_ACTION_SEND_REQUEST:
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.transport.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.transport.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
      case DETAIL_ACTION_DELETE:
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.transport.table.deleteConfirm.title',
            messageKey: 'portal.user.features.transport.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.transportService.delete(item.id)),
          )
          .subscribe({
            next: () => {
              void this.router.navigateByUrl(userOurListingsUrl('transport'));
            },
          });
        break;
    }
  }
}
