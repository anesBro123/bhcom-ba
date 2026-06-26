import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  adminEditVehicleUrl,
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
import type { Vehicle } from '../data/vehicle.model';
import { AdminVehicleService } from '../data/vehicle.service';
import { VehicleDetail } from './vehicle.detail';

@Component({
  selector: 'app-vehicle-detail-page',
  imports: [
    TranslatePipe,
    PageBackLinkComponent,
    PageTitleComponent,
    DetailPageLayoutComponent,
    DetailActionBarComponent,
    EntityDetailSummaryComponent,
    DetailViewComponent,
  ],
  templateUrl: './vehicle-detail-page.component.html',
  styleUrl: './vehicle-detail-page.component.scss',
})
export class VehicleDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly VehicleDetail = VehicleDetail;
  protected readonly pageTitleKey = 'portal.admin.pages.viewVehicle.title';
  protected readonly pageIcon = AdminPageIcons.vehicles;

  protected readonly entity = signal<Vehicle | null>(null);
  protected readonly loading = signal(true);

  protected readonly back = computed(() => resolveAdminDetailBack('vehicles'));
  protected readonly pageSubtitleKey = computed(() => resolveAdminDetailSubtitleKey('vehicles'));

  protected readonly detailActions = computed(() => {
    const item = this.entity();
    if (!item) {
      return [];
    }

    return buildDetailPageActions('admin', 'vehicles', {
      editRoute: adminEditVehicleUrl(item.id),
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigateByUrl(adminHomeUrl('vehicles'));
      return;
    }

    this.vehicleService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          this.entity.set(item);
          this.loading.set(false);
        },
        error: () => {
          void this.router.navigateByUrl(adminHomeUrl('vehicles'));
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
          titleKey: 'portal.admin.features.vehicles.table.deleteConfirm.title',
          messageKey: 'portal.admin.features.vehicles.table.deleteConfirm.message',
          danger: true,
        })
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => this.vehicleService.delete(item.id)),
        )
        .subscribe({
          next: () => {
            void this.router.navigateByUrl(adminHomeUrl('vehicles'));
          },
        });
    }
  }
}
