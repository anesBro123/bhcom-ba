import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import {ConfirmService } from '../../../../../shared/confirm';
import { adminEditVehicleUrl } from '../../../../../shared/constants/app-urls';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import {
  DataTableComponent,
  TableCellTemplateDirective,
  tableCellKey,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Vehicle } from '../data/vehicle.model';
import { AdminVehicleService } from '../data/vehicle.service';
import { VehicleTable } from './vehicle.table';

@Component({
  selector: 'app-vehicle-table-page',
  imports: [DataTableComponent, TableCellTemplateDirective, TranslatePipe, PageTitleComponent],
  templateUrl: './vehicle-table-page.component.html',
  styleUrl: './vehicle-table-page.component.scss',
})
export class VehicleTablePageComponent {
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = VehicleTable;
  protected readonly vrstaVozilaKey = tableCellKey(VehicleTable, 'vrstaVozila');
  protected readonly tableMounted = signal(true);

  protected readonly loadVehicles: TableLoader<Vehicle> = (query) =>
    this.vehicleService.list(query);

  protected vrstaVozilaLabel(vrsta: string): string {
    return `portal.admin.features.vehicles.form.vrstaVozila.${vrsta}`;
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
