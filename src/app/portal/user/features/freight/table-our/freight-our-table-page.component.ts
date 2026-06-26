import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  USER_CREATE_FREIGHT_URL,
  userEditFreightUrl,
  userFreightDetailUrl,
} from '../../../../../shared/constants/app-urls';
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
  FreightOurTable,
  freightOurNeededByDateCellKey,
  freightOurRouteCellKey,
  freightOurStatusCellKey,
  freightOurSizeCellKey,
  freightOurTypeCellKey,
} from './freight-our.table';

@Component({
  selector: 'app-freight-our-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    DateRangeDisplayComponent,
    StatusBadgeComponent,
    FreightSizeDisplayComponent,
  ],
  templateUrl: './freight-our-table-page.component.html',
})
export class FreightOurTablePageComponent {
  private readonly cargoService = inject(UserFreightService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = FreightOurTable;
  protected readonly createUrl = USER_CREATE_FREIGHT_URL;
  protected readonly createLabelKey = 'portal.user.pages.createFreight.title';
  protected readonly routeKey = freightOurRouteCellKey;
  protected readonly statusKey = freightOurStatusCellKey;
  protected readonly freightTypeKey = freightOurTypeCellKey;
  protected readonly sizeKey = freightOurSizeCellKey;
  protected readonly neededByDateKey = freightOurNeededByDateCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Freight> = (query) => this.cargoService.listOurs(query);

  protected freightTypeLabel(type: string): string {
    return `portal.user.features.freight.form.freightTypes.${type}`;
  }

  protected onRowClick(row: Freight): void {
    navigateToEntityDetail(this.router, userFreightDetailUrl(row.id), 'our');
  }

  protected onRowAction(event: RowActionEvent<Freight>): void {
    switch (event.actionId) {
      case 'viewDetails':
        this.onRowClick(event.row);
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditFreightUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.freight.table.deleteConfirm.title',
            messageKey: 'portal.user.features.freight.table.deleteConfirm.message',
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
