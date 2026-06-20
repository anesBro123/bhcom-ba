import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import {
  USER_CREATE_WAREHOUSE_URL,
  userEditWarehouseUrl,
} from '../../../../../shared/constants/app-urls';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { WarehouseDisplayComponent } from '../../../../../shared/ui/warehouse-display/warehouse-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Warehouse } from '../data/warehouse.model';
import { UserWarehouseService } from '../data/warehouse.service';
import { openWarehouseDetailModal } from '../detail/open-warehouse-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import {
  WarehouseOurTable,
  warehouseOurPeriodCellKey,
  warehouseOurStatusCellKey,
  warehouseOurWarehouseCellKey,
} from './warehouse-our.table';

@Component({
  selector: 'app-warehouse-our-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    WarehouseDisplayComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './warehouse-our-table-page.component.html',
})
export class WarehouseOurTablePageComponent {
  readonly embedded = input(false);

  private readonly storageService = inject(UserWarehouseService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = WarehouseOurTable;
  protected readonly pageTitleKey = 'portal.user.pages.ourWarehouse.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.ourWarehouse.subtitle';
  protected readonly pageIcon = UserPageIcons.warehouse;
  protected readonly createUrl = USER_CREATE_WAREHOUSE_URL;
  protected readonly createLabelKey = 'portal.user.nav.offerWarehouse';
  protected readonly statusKey = warehouseOurStatusCellKey;
  protected readonly warehouseKey = warehouseOurWarehouseCellKey;
  protected readonly periodKey = warehouseOurPeriodCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadStorage: TableLoader<Warehouse> = (query) =>
    this.storageService.listOurs(query);

  protected onRowAction(event: RowActionEvent<Warehouse>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openWarehouseDetailModal(this.detailModalService, this.router, event.row, 'my');
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditWarehouseUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.warehouse.table.deleteConfirm.title',
            messageKey: 'portal.user.features.warehouse.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.storageService.delete(event.row.id)),
          )
          .subscribe({
            next: () => this.refreshTable(),
          });
        break;
    }
  }

  private refreshTable(): void {
    this.tableMounted.set(false);
    queueMicrotask(() => this.tableMounted.set(true));
  }
}
