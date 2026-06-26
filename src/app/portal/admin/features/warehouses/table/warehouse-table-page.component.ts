import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { adminEditWarehouseUrl, adminWarehouseDetailUrl } from '../../../../../shared/constants/app-urls';

import { WarehouseDisplayComponent } from '../../../../../shared/ui/warehouse-display/warehouse-display.component';

import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Warehouse } from '../data/warehouse.model';
import { AdminWarehouseService } from '../data/warehouse.service';
import { WarehouseTable, warehouseDisplayCellKey, warehouseTypeCellKey } from './warehouse.table';

@Component({
  selector: 'app-warehouse-table-page',
  imports: [DataTableComponent, TableCellTemplateDirective, TranslatePipe, WarehouseDisplayComponent],
  templateUrl: './warehouse-table-page.component.html',
  styleUrl: './warehouse-table-page.component.scss',
})
export class WarehouseTablePageComponent {
  private readonly warehouseService = inject(AdminWarehouseService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  readonly embedded = input(false);

  protected readonly table = WarehouseTable;
  protected readonly warehouseKey = warehouseDisplayCellKey;
  protected readonly typeKey = warehouseTypeCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadWarehouses: TableLoader<Warehouse> = (query) =>
    this.warehouseService.list(query);

  protected warehouseTypeLabel(type: string): string {
    return `portal.admin.features.warehouses.form.warehouseType.${type}`;
  }

  protected onRowClick(row: Warehouse): void {
    void this.router.navigateByUrl(adminWarehouseDetailUrl(row.id));
  }

  protected onRowAction(event: RowActionEvent<Warehouse>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.onRowClick(event.row);
        break;
      case 'edit':
        void this.router.navigateByUrl(adminEditWarehouseUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.admin.features.warehouses.table.deleteConfirm.title',
            messageKey: 'portal.admin.features.warehouses.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.warehouseService.delete(event.row.id)),
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
