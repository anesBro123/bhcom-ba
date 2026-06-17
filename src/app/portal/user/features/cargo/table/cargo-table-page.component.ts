import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { USER_CREATE_CARGO_URL, userEditCargoUrl } from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import { RouteDisplayComponent } from '../../../../../shared/ui/route-display/route-display.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Cargo } from '../data/cargo.model';
import { UserCargoService } from '../data/cargo.service';
import { UserPageIcons } from '../../../user-page-icons';
import { CargoTable, cargoRouteCellKey, cargoTypeCellKey } from './cargo.table';

@Component({
  selector: 'app-cargo-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    TranslatePipe,
    RouteDisplayComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './cargo-table-page.component.html',
  styleUrl: './cargo-table-page.component.scss',
})
export class CargoTablePageComponent {
  private readonly cargoService = inject(UserCargoService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = CargoTable;
  protected readonly pageTitleKey = 'portal.user.pages.cargo.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.cargo.subtitle';
  protected readonly pageIcon = UserPageIcons.cargo;
  protected readonly createUrl = USER_CREATE_CARGO_URL;
  protected readonly createLabelKey = 'portal.user.nav.postCargo';
  protected readonly routeKey = cargoRouteCellKey;
  protected readonly cargoTypeKey = cargoTypeCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadCargo: TableLoader<Cargo> = (query) => this.cargoService.list(query);

  protected cargoTypeLabel(type: string): string {
    return `portal.user.features.cargo.form.cargoTypes.${type}`;
  }

  protected onRowAction(event: RowActionEvent<Cargo>): void {
    switch (event.actionId) {
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
