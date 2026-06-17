import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  USER_CREATE_ROUTE_URL,
  userEditRouteUrl,
} from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  tableCellKey,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Route } from '../data/route.model';
import { UserRouteService } from '../data/route.service';
import { RouteTable } from './route.table';

@Component({
  selector: 'app-route-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './route-table-page.component.html',
  styleUrl: './route-table-page.component.scss',
})
export class RouteTablePageComponent {
  private readonly routeService = inject(UserRouteService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = RouteTable;
  protected readonly pageTitleKey = 'portal.user.pages.routes.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.routes.subtitle';
  protected readonly createUrl = USER_CREATE_ROUTE_URL;
  protected readonly createLabelKey = 'portal.user.nav.postRoute';
  protected readonly routeKey = tableCellKey(RouteTable, 'origin');
  protected readonly tableMounted = signal(true);

  protected readonly loadRoutes: TableLoader<Route> = (query) => this.routeService.list(query);

  protected routeLabel(row: Route): string {
    return `${row.origin} → ${row.destination}`;
  }

  protected onRowAction(event: RowActionEvent<Route>): void {
    switch (event.actionId) {
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
