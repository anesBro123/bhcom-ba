import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import { USER_CREATE_FREIGHT_URL, userEditFreightUrl } from '../../../../../shared/constants/app-urls';
import { DateRangeDisplayComponent } from '../../../../../shared/ui/date-range-display/date-range-display.component';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
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
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './freight-our-table-page.component.html',
})
export class FreightOurTablePageComponent {
  readonly embedded = input(false);

  private readonly cargoService = inject(UserFreightService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = FreightOurTable;
  protected readonly pageTitleKey = 'portal.user.pages.ourFreight.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.ourFreight.subtitle';
  protected readonly pageIcon = UserPageIcons.freight;
  protected readonly createUrl = USER_CREATE_FREIGHT_URL;
  protected readonly createLabelKey = 'portal.user.nav.offerFreight';
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

  protected onRowAction(event: RowActionEvent<Freight>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openFreightDetailModal(this.detailModalService, this.router, event.row, 'my');
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
