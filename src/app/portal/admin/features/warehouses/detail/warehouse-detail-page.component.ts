import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  adminEditWarehouseUrl,
  adminHomeUrl,
} from '../../../../../shared/constants/app-urls';
import {
  buildDetailPageActions,
  DETAIL_ACTION_DELETE,
  DetailViewComponent,
} from '../../../../../shared/detail';
import { EntityDetailSummaryComponent } from '../../../../../shared/ui/entity-detail-summary/entity-detail-summary.component';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { DetailActionBarComponent } from '../../../../../shared/ui/detail-action-bar/detail-action-bar.component';
import { DetailPageLayoutComponent } from '../../../../../shared/ui/detail-page-layout/detail-page-layout.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import {
  resolveAdminDetailBack,
  resolveAdminDetailSubtitleKey,
} from '../../../common/admin-entity-detail-navigation';
import { AdminPageIcons } from '../../../admin-page-icons';
import type { Warehouse } from '../data/warehouse.model';
import { AdminWarehouseService } from '../data/warehouse.service';
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
  private readonly warehouseService = inject(AdminWarehouseService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly WarehouseDetail = WarehouseDetail;
  protected readonly pageTitleKey = 'portal.admin.pages.viewWarehouse.title';
  protected readonly pageIcon = AdminPageIcons.warehouses;

  protected readonly entity = signal<Warehouse | null>(null);
  protected readonly loading = signal(true);

  protected readonly back = computed(() => resolveAdminDetailBack('warehouses'));
  protected readonly pageSubtitleKey = computed(() => resolveAdminDetailSubtitleKey('warehouses'));

  protected readonly detailActions = computed(() => {
    const item = this.entity();
    if (!item) {
      return [];
    }

    return buildDetailPageActions('admin', 'warehouses', {
      editRoute: adminEditWarehouseUrl(item.id),
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigateByUrl(adminHomeUrl('warehouses'));
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
          void this.router.navigateByUrl(adminHomeUrl('warehouses'));
        },
      });
  }

  protected onDetailAction(actionId: string): void {
    const item = this.entity();
    if (!item) {
      return;
    }

    if (actionId === DETAIL_ACTION_DELETE) {
      this.confirmService
        .confirm({
          titleKey: 'portal.admin.features.warehouses.table.deleteConfirm.title',
          messageKey: 'portal.admin.features.warehouses.table.deleteConfirm.message',
          danger: true,
        })
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => this.warehouseService.delete(item.id)),
        )
        .subscribe({
          next: () => {
            void this.router.navigateByUrl(adminHomeUrl('warehouses'));
          },
        });
    }
  }
}
