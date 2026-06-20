import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { ADMIN_CREATE_VEHICLE_URL, adminEditVehicleUrl } from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import { VehicleTypeDisplayComponent } from '../../../../../shared/ui/vehicle-type-display/vehicle-type-display.component';
import type { VehicleType } from '../../../../../shared/constants/vehicle-type';

import {
  DataTableComponent,
  TableCellTemplateDirective,
  tableCellKey,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Vehicle } from '../data/vehicle.model';
import { AdminVehicleService } from '../data/vehicle.service';
import { AdminPageIcons } from '../../../admin-page-icons';
import { VehicleTable } from './vehicle.table';

@Component({
  selector: 'app-vehicle-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
    VehicleTypeDisplayComponent,
  ],
  templateUrl: './vehicle-table-page.component.html',
  styleUrl: './vehicle-table-page.component.scss',
})
export class VehicleTablePageComponent {
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = VehicleTable;
  protected readonly pageTitleKey = 'portal.admin.pages.vehicles.title';
  protected readonly pageSubtitleKey = 'portal.admin.pages.vehicles.subtitle';
  protected readonly pageIcon = AdminPageIcons.vehicles;
  protected readonly createUrl = ADMIN_CREATE_VEHICLE_URL;
  protected readonly createLabelKey = 'portal.admin.nav.createVehicle';
  protected readonly vehicleTypeKey = tableCellKey(VehicleTable, 'vehicleType');
  protected readonly tableMounted = signal(true);

  protected readonly loadVehicles: TableLoader<Vehicle> = (query) =>
    this.vehicleService.list(query);

  protected asVehicleType(value: string): VehicleType {
    return value as VehicleType;
  }

  protected onRowAction(event: RowActionEvent<Vehicle>): void {
    switch (event.actionId) {
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
