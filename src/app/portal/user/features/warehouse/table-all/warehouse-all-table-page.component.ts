import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { userWarehouseDetailUrl } from '../../../../../shared/constants/app-urls';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { WarehouseDisplayComponent } from '../../../../../shared/ui/warehouse-display/warehouse-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import { navigateToEntityDetail } from '../../../common/entity-detail-navigation';
import type { Warehouse } from '../data/warehouse.model';
import { UserWarehouseService } from '../data/warehouse.service';
import {
  WarehouseAllTable,
  warehouseAllPeriodCellKey,
  warehouseAllStatusCellKey,
  warehouseAllWarehouseCellKey,
} from './warehouse-all.table';

@Component({
  selector: 'app-warehouse-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    WarehouseDisplayComponent,
  ],
  templateUrl: './warehouse-all-table-page.component.html',
})
export class WarehouseAllTablePageComponent {
  private readonly storageService = inject(UserWarehouseService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = WarehouseAllTable;
  protected readonly statusKey = warehouseAllStatusCellKey;
  protected readonly warehouseKey = warehouseAllWarehouseCellKey;
  protected readonly periodKey = warehouseAllPeriodCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadStorage: TableLoader<Warehouse> = (query) =>
    this.storageService.listAll(query);

  protected onRowClick(row: Warehouse): void {
    navigateToEntityDetail(this.router, userWarehouseDetailUrl(row.id), 'search');
  }

  protected onRowAction(event: RowActionEvent<Warehouse>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.onRowClick(event.row);
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.warehouse.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.warehouse.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
