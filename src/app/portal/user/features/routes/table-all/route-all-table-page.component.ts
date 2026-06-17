import { Component, inject, signal } from '@angular/core';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { VehicleDisplayComponent } from '../../../../../shared/ui/vehicle-display/vehicle-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Route } from '../data/route.model';
import { UserRouteService } from '../data/route.service';
import { UserPageIcons } from '../../../user-page-icons';
import {
  RouteAllTable,
  routeAllCellKey,
  routeAllStatusCellKey,
  routeAllVehicleCellKey,
} from './route-all.table';

@Component({
  selector: 'app-route-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    RouteDisplayComponent,
    StatusBadgeComponent,
    VehicleDisplayComponent,
    PageTitleComponent,
  ],
  templateUrl: './route-all-table-page.component.html',
})
export class RouteAllTablePageComponent {
  private readonly routeService = inject(UserRouteService);
  private readonly confirmService = inject(ConfirmService);

  protected readonly table = RouteAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.allRoutes.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.allRoutes.subtitle';
  protected readonly pageIcon = UserPageIcons.routes;
  protected readonly routeKey = routeAllCellKey;
  protected readonly statusKey = routeAllStatusCellKey;
  protected readonly vehicleKey = routeAllVehicleCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadRoutes: TableLoader<Route> = (query) => this.routeService.listAll(query);

  protected onRowAction(event: RowActionEvent<Route>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.routes.table.viewDetailsComingSoon.title',
            messageKey: 'portal.user.features.routes.table.viewDetailsComingSoon.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.routes.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.routes.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
