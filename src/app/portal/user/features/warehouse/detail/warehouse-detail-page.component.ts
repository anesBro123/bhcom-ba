import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { AuthService } from '../../../../../shared/core/auth/auth.service';
import { ConfirmService } from '../../../../../shared/confirm';
import {
  userEditWarehouseUrl,
  userMarketplaceUrl,
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
import type { Warehouse } from '../data/warehouse.model';
import { UserWarehouseService } from '../data/warehouse.service';
import { UserPageIcons } from '../../../user-page-icons';
import { WarehouseDetail } from './warehouse.detail';

@Component({
  selector: 'app-warehouse-detail-page',
  imports: [
    TranslatePipe,
    PageBackLinkComponent,
    PageTitleComponent,
    DetailPageLayoutComponent,
    DetailActionBarComponent,
    EntityDetailSummaryComponent,
    DetailViewComponent,
  ],
  templateUrl: './warehouse-detail-page.component.html',
  styleUrl: './warehouse-detail-page.component.scss',
})
export class WarehouseDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly warehouseService = inject(UserWarehouseService);
  private readonly authService = inject(AuthService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly WarehouseDetail = WarehouseDetail;
  protected readonly pageTitleKey = 'portal.user.pages.viewWarehouse.title';
  protected readonly pageIcon = UserPageIcons.warehouse;

  protected readonly entity = signal<Warehouse | null>(null);
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
    resolveDetailBack('warehouse', this.isOwnListing(), this.detailOrigin),
  );

  protected readonly pageSubtitleKey = computed(() =>
    resolveDetailSubtitleKey(this.isOwnListing(), this.detailOrigin),
  );

  protected readonly detailActions = computed(() => {
    const item = this.entity();
    if (!item) {
      return [];
    }

    return buildDetailPageActions('warehouse', {
      isOwnListing: this.isOwnListing(),
      editRoute: userEditWarehouseUrl(item.id),
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigateByUrl(userMarketplaceUrl('warehouse'));
      return;
    }

    this.warehouseService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          this.entity.set(item);
          this.loading.set(false);
        },
        error: () => {
          void this.router.navigateByUrl(userMarketplaceUrl('warehouse'));
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
            titleKey: 'portal.user.features.warehouse.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.warehouse.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
      case DETAIL_ACTION_DELETE:
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.warehouse.table.deleteConfirm.title',
            messageKey: 'portal.user.features.warehouse.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.warehouseService.delete(item.id)),
          )
          .subscribe({
            next: () => {
              void this.router.navigateByUrl(userOurListingsUrl('warehouse'));
            },
          });
        break;
    }
  }
}
