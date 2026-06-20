import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { CargoSizeDisplayComponent } from '../ui/cargo-size-display/cargo-size-display.component';
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
  CargoAllTable,
  cargoAllNeededByDateCellKey,
  cargoAllRouteCellKey,
  cargoAllStatusCellKey,
  cargoAllSizeCellKey,
  cargoAllTypeCellKey,
} from './cargo-all.table';

@Component({
  selector: 'app-cargo-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    CargoSizeDisplayComponent,
    PageTitleComponent,
  ],
  templateUrl: './cargo-all-table-page.component.html',
})
export class CargoAllTablePageComponent {
  private readonly cargoService = inject(UserCargoService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = CargoAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.allCargo.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.allCargo.subtitle';
  protected readonly pageIcon = UserPageIcons.cargo;
  protected readonly routeKey = cargoAllRouteCellKey;
  protected readonly statusKey = cargoAllStatusCellKey;
  protected readonly cargoTypeKey = cargoAllTypeCellKey;
  protected readonly sizeKey = cargoAllSizeCellKey;
  protected readonly neededByDateKey = cargoAllNeededByDateCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Cargo> = (query) => this.cargoService.listAll(query);

  protected cargoTypeLabel(type: string): string {
    return `portal.user.features.cargo.form.cargoTypes.${type}`;
  }

  protected onRowAction(event: RowActionEvent<Cargo>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openCargoDetailModal(this.detailModalService, this.router, event.row, 'all');
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.cargo.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.cargo.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
