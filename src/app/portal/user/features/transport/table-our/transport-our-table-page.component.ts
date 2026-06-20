import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import {
  USER_CREATE_TRANSPORT_URL,
  userEditTransportUrl,
} from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
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
  TransportOurTable,
  transportOurCellKey,
  transportOurPeriodCellKey,
  transportOurStatusCellKey,
  transportOurVehicleCellKey,
  transportOurVehicleTypeCellKey,
} from './transport-our.table';

@Component({
  selector: 'app-transport-our-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    VehicleDisplayComponent,
    VehicleTypeDisplayComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './transport-our-table-page.component.html',
})
export class TransportOurTablePageComponent {
  private readonly routeService = inject(UserTransportService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = TransportOurTable;
  protected readonly pageTitleKey = 'portal.user.pages.ourTransport.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.ourTransport.subtitle';
  protected readonly pageIcon = UserPageIcons.transport;
  protected readonly createUrl = USER_CREATE_TRANSPORT_URL;
  protected readonly createLabelKey = 'portal.user.nav.offerTransport';
  protected readonly transportKey = transportOurCellKey;
  protected readonly statusKey = transportOurStatusCellKey;
  protected readonly vehicleKey = transportOurVehicleCellKey;
  protected readonly vehicleTypeKey = transportOurVehicleTypeCellKey;
  protected readonly periodKey = transportOurPeriodCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadRoutes: TableLoader<Transport> = (query) => this.routeService.listOurs(query);

  protected onRowAction(event: RowActionEvent<Transport>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openTransportDetailModal(this.detailModalService, this.router, event.row, 'my');
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditTransportUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.transport.table.deleteConfirm.title',
            messageKey: 'portal.user.features.transport.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.routeService.delete(event.row.id)),
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
