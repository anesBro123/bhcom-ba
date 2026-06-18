import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import { USER_CREATE_CARGO_URL, userEditCargoUrl } from '../../../../../shared/constants/app-urls';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Cargo } from '../data/cargo.model';
import { UserCargoService } from '../data/cargo.service';
import { openCargoDetailModal } from '../detail/open-cargo-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import {
  CargoMyTable,
  cargoMyNeededByDateCellKey,
  cargoMyRouteCellKey,
  cargoMyStatusCellKey,
  cargoMyTypeCellKey,
} from './cargo-my.table';

@Component({
  selector: 'app-cargo-my-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './cargo-my-table-page.component.html',
})
export class CargoMyTablePageComponent {
  private readonly cargoService = inject(UserCargoService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = CargoMyTable;
  protected readonly pageTitleKey = 'portal.user.pages.myCargo.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.myCargo.subtitle';
  protected readonly pageIcon = UserPageIcons.cargo;
  protected readonly createUrl = USER_CREATE_CARGO_URL;
  protected readonly createLabelKey = 'portal.user.nav.postCargo';
  protected readonly routeKey = cargoMyRouteCellKey;
  protected readonly statusKey = cargoMyStatusCellKey;
  protected readonly cargoTypeKey = cargoMyTypeCellKey;
  protected readonly neededByDateKey = cargoMyNeededByDateCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Cargo> = (query) => this.cargoService.listMine(query);

  protected cargoTypeLabel(type: string): string {
    return `portal.user.features.cargo.form.cargoTypes.${type}`;
  }

  protected onRowAction(event: RowActionEvent<Cargo>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openCargoDetailModal(this.detailModalService, this.router, event.row, 'my');
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditCargoUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.cargo.table.deleteConfirm.title',
            messageKey: 'portal.user.features.cargo.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.cargoService.delete(event.row.id)),
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
