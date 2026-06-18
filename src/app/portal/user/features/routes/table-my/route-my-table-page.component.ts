import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import {
  USER_CREATE_ROUTE_URL,
  userEditRouteUrl,
} from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
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
import { openRouteDetailModal } from '../detail/open-route-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import {
  RouteMyTable,
  routeMyCellKey,
  routeMyPeriodCellKey,
  routeMyStatusCellKey,
  routeMyVehicleCellKey,
} from './route-my.table';

@Component({
  selector: 'app-route-my-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    VehicleDisplayComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './route-my-table-page.component.html',
})
export class RouteMyTablePageComponent {
  private readonly routeService = inject(UserRouteService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = RouteMyTable;
  protected readonly pageTitleKey = 'portal.user.pages.myRoutes.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.myRoutes.subtitle';
  protected readonly pageIcon = UserPageIcons.routes;
  protected readonly createUrl = USER_CREATE_ROUTE_URL;
  protected readonly createLabelKey = 'portal.user.nav.postRoute';
  protected readonly routeKey = routeMyCellKey;
  protected readonly statusKey = routeMyStatusCellKey;
  protected readonly vehicleKey = routeMyVehicleCellKey;
  protected readonly periodKey = routeMyPeriodCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadRoutes: TableLoader<Route> = (query) => this.routeService.listMine(query);

  protected onRowAction(event: RowActionEvent<Route>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openRouteDetailModal(this.detailModalService, this.router, event.row, 'my');
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditRouteUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.routes.table.deleteConfirm.title',
            messageKey: 'portal.user.features.routes.table.deleteConfirm.message',
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
