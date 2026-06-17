import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideCircleCheck,
  LucideClock,
  LucidePlane,
  LucideShip,
  LucideTruck,
} from '@lucide/angular';

import {
  DataTableComponent,
  TableApiService,
  TableCellTemplateDirective,
  tableCellKey,
  type RowActionEvent,
  type TableLoader,
  type TableQuery,
} from '../../../../shared/table';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';

import { SHIPMENT_MOCK_DATA } from './shipment.mock-data';
import type { Shipment, ShipmentPriority, ShipmentStatus, ShipmentType } from './shipment.model';
import { ShipmentTable } from './shipment.table';

@Component({
  selector: 'app-shipments-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    PageTitleComponent,
    LucideTruck,
    LucideClock,
    LucideCircleCheck,
    LucidePlane,
    LucideShip,
  ],
  templateUrl: './shipments-page.component.html',
  styleUrl: './shipments-page.component.scss',
})
export class ShipmentsPageComponent {
  private readonly tableApi = inject(TableApiService);

  protected readonly table = ShipmentTable;
  protected readonly pageTitleKey = 'portal.user.pages.allShipments.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.allShipments.subtitle';
  protected readonly idKey = tableCellKey(ShipmentTable, 'id');
  protected readonly statusKey = tableCellKey(ShipmentTable, 'status');
  protected readonly typeKey = tableCellKey(ShipmentTable, 'type');
  protected readonly priorityKey = tableCellKey(ShipmentTable, 'priority');

  protected readonly loadShipments: TableLoader<Shipment> = (query: TableQuery) =>
    this.tableApi.loadMock(SHIPMENT_MOCK_DATA, query, ShipmentTable.filters);

  protected statusLabel(status: ShipmentStatus): string {
    return `portal.user.features.shipments.table.status.${status}`;
  }

  protected typeLabel(type: ShipmentType): string {
    return `portal.user.features.shipments.table.type.${type}`;
  }

  protected priorityLetter(priority: ShipmentPriority): string {
    switch (priority) {
      case 'standard':
        return 'S';
      case 'express':
        return 'E';
      case 'economy':
        return 'N';
    }
  }

  protected priorityTitle(priority: ShipmentPriority): string {
    return `portal.user.features.shipments.table.priority.${priority}`;
  }

  protected onRowAction(event: RowActionEvent<Shipment>): void {
    switch (event.actionId) {
      case 'view':
        console.info('View shipment', event.row.id);
        break;
      case 'edit':
        console.info('Edit shipment', event.row.id);
        break;
      case 'duplicate':
        console.info('Duplicate shipment', event.row.id);
        break;
      case 'delete':
        console.info('Delete shipment', event.row.id);
        break;
    }
  }
}
