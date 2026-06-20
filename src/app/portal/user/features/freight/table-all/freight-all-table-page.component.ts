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
import { FreightSizeDisplayComponent } from '../ui/freight-size-display/freight-size-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Freight } from '../data/freight.model';
import { UserFreightService } from '../data/freight.service';
import { openFreightDetailModal } from '../detail/open-freight-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import {
  FreightAllTable,
  freightAllNeededByDateCellKey,
  freightAllRouteCellKey,
  freightAllStatusCellKey,
  freightAllSizeCellKey,
  freightAllTypeCellKey,
} from './freight-all.table';

@Component({
  selector: 'app-freight-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    FreightSizeDisplayComponent,
    PageTitleComponent,
  ],
  templateUrl: './freight-all-table-page.component.html',
})
export class FreightAllTablePageComponent {
  private readonly cargoService = inject(UserFreightService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = FreightAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.marketplaceFreight.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.marketplaceFreight.subtitle';
  protected readonly pageIcon = UserPageIcons.freight;
  protected readonly routeKey = freightAllRouteCellKey;
  protected readonly statusKey = freightAllStatusCellKey;
  protected readonly freightTypeKey = freightAllTypeCellKey;
  protected readonly sizeKey = freightAllSizeCellKey;
  protected readonly neededByDateKey = freightAllNeededByDateCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Freight> = (query) => this.cargoService.listAll(query);

  protected freightTypeLabel(type: string): string {
    return `portal.user.features.freight.form.freightTypes.${type}`;
  }

  protected onRowAction(event: RowActionEvent<Freight>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openFreightDetailModal(this.detailModalService, this.router, event.row, 'all');
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.freight.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.freight.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
