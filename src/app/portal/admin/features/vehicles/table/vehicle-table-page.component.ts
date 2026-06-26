import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { adminEditVehicleUrl, adminVehicleDetailUrl } from '../../../../../shared/constants/app-urls';
import { VehicleDisplayComponent } from '../../../../../shared/ui/vehicle-display/vehicle-display.component';
import { VehicleTypeDisplayComponent } from '../../../../../shared/ui/vehicle-type-display/vehicle-type-display.component';
import type { VehicleType } from '../../../../../shared/constants/vehicle-type';

import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Vehicle } from '../data/vehicle.model';
import { AdminVehicleService } from '../data/vehicle.service';
import { VehicleTable, vehicleDisplayCellKey, vehicleTypeCellKey } from './vehicle.table';

@Component({
  selector: 'app-vehicle-table-page',
  imports: [DataTableComponent, TableCellTemplateDirective, VehicleTypeDisplayComponent, VehicleDisplayComponent],
  templateUrl: './vehicle-table-page.component.html',
  styleUrl: './vehicle-table-page.component.scss',
})
export class VehicleTablePageComponent {
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  readonly embedded = input(false);

  protected readonly table = VehicleTable;
  protected readonly vehicleKey = vehicleDisplayCellKey;
  protected readonly vehicleTypeKey = vehicleTypeCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadVehicles: TableLoader<Vehicle> = (query) =>
    this.vehicleService.list(query);

  protected asVehicleType(value: string): VehicleType {
    return value as VehicleType;
  }

  protected onRowClick(row: Vehicle): void {
    void this.router.navigateByUrl(adminVehicleDetailUrl(row.id));
  }

  protected onRowAction(event: RowActionEvent<Vehicle>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.onRowClick(event.row);
        break;
      case 'edit':
        void this.router.navigateByUrl(adminEditVehicleUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.admin.features.vehicles.table.deleteConfirm.title',
            messageKey: 'portal.admin.features.vehicles.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.vehicleService.delete(event.row.id)),
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
