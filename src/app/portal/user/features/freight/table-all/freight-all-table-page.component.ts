import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { userFreightDetailUrl } from '../../../../../shared/constants/app-urls';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import { FreightSizeDisplayComponent } from '../ui/freight-size-display/freight-size-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import { navigateToEntityDetail } from '../../../common/entity-detail-navigation';
import type { Freight } from '../data/freight.model';
import { UserFreightService } from '../data/freight.service';
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
  ],
  templateUrl: './freight-all-table-page.component.html',
})
export class FreightAllTablePageComponent {
  private readonly cargoService = inject(UserFreightService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = FreightAllTable;
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

  protected onRowClick(row: Freight): void {
    navigateToEntityDetail(this.router, userFreightDetailUrl(row.id), 'search');
  }

  protected onRowAction(event: RowActionEvent<Freight>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.onRowClick(event.row);
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
