import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { VehicleDisplayComponent } from '../../../../../shared/ui/vehicle-display/vehicle-display.component';
import { VehicleTypeDisplayComponent } from '../../../../../shared/ui/vehicle-type-display/vehicle-type-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Transport } from '../data/transport.model';
import { UserTransportService } from '../data/transport.service';
import { openTransportDetailModal } from '../detail/open-transport-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import {
  TransportAllTable,
  transportAllCellKey,
  transportAllPeriodCellKey,
  transportAllStatusCellKey,
  transportAllVehicleCellKey,
  transportAllVehicleTypeCellKey,
} from './transport-all.table';

@Component({
  selector: 'app-transport-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    VehicleDisplayComponent,
    VehicleTypeDisplayComponent,
    PageTitleComponent,
  ],
  templateUrl: './transport-all-table-page.component.html',
})
export class TransportAllTablePageComponent {
  private readonly routeService = inject(UserTransportService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = TransportAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.marketplaceTransport.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.marketplaceTransport.subtitle';
  protected readonly pageIcon = UserPageIcons.transport;
  protected readonly transportKey = transportAllCellKey;
  protected readonly statusKey = transportAllStatusCellKey;
  protected readonly vehicleKey = transportAllVehicleCellKey;
  protected readonly vehicleTypeKey = transportAllVehicleTypeCellKey;
  protected readonly periodKey = transportAllPeriodCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadRoutes: TableLoader<Transport> = (query) => this.routeService.listAll(query);

  protected onRowAction(event: RowActionEvent<Transport>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openTransportDetailModal(this.detailModalService, this.router, event.row, 'all');
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.transport.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.transport.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
