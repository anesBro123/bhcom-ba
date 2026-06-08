import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { adminEditVehicleUrl } from '../../../../../shared/constants/app-urls';

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
  imports: [DataTableComponent, TableCellTemplateDirective, TranslatePipe],
  templateUrl: './vehicle-table-page.component.html',
  styleUrl: './vehicle-table-page.component.scss',
})
export class VehicleTablePageComponent {
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly router = inject(Router);

  protected readonly table = VehicleTable;
  protected readonly vrstaVozilaKey = tableCellKey(VehicleTable, 'vrstaVozila');
  protected readonly tableMounted = signal(true);

  protected readonly loadVehicles: TableLoader<Vehicle> = (query) =>
    this.vehicleService.list(query);

  protected vrstaVozilaLabel(vrsta: string): string {
    return `forms.adminVehicle.vrstaVozila.${vrsta}`;
  }

  protected onRowAction(event: RowActionEvent<Vehicle>): void {
    switch (event.actionId) {
      case 'edit':
        void this.router.navigateByUrl(adminEditVehicleUrl(event.row.id));
        break;
      case 'delete':
        this.vehicleService.delete(event.row.id).subscribe({
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
