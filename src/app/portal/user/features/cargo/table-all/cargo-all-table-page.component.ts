import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
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
import { UserPageIcons } from '../../../user-page-icons';
import {
  CargoAllTable,
  cargoAllRouteCellKey,
  cargoAllStatusCellKey,
  cargoAllTypeCellKey,
} from './cargo-all.table';

@Component({
  selector: 'app-cargo-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    StatusBadgeComponent,
    PageTitleComponent,
  ],
  templateUrl: './cargo-all-table-page.component.html',
})
export class CargoAllTablePageComponent {
  private readonly cargoService = inject(UserCargoService);
  private readonly confirmService = inject(ConfirmService);

  protected readonly table = CargoAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.allCargo.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.allCargo.subtitle';
  protected readonly pageIcon = UserPageIcons.cargo;
  protected readonly routeKey = cargoAllRouteCellKey;
  protected readonly statusKey = cargoAllStatusCellKey;
  protected readonly cargoTypeKey = cargoAllTypeCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Cargo> = (query) => this.cargoService.listAll(query);

  protected cargoTypeLabel(type: string): string {
    return `portal.user.features.cargo.form.cargoTypes.${type}`;
  }

  protected onRowAction(event: RowActionEvent<Cargo>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.cargo.table.viewDetailsComingSoon.title',
            messageKey: 'portal.user.features.cargo.table.viewDetailsComingSoon.message',
          })
          .pipe(take(1))
          .subscribe();
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
