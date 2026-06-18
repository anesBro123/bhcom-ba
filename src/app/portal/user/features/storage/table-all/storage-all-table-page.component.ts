import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { StatusBadgeComponent } from '../../../../../shared/ui/status-badge/status-badge.component';
import {
  DataTableComponent,
  TableCellTemplateDirective,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Storage } from '../data/storage.model';
import { UserStorageService } from '../data/storage.service';
import { openStorageDetailModal } from '../detail/open-storage-detail-modal';
import { UserPageIcons } from '../../../user-page-icons';
import { StorageAllTable, storageAllStatusCellKey } from './storage-all.table';

@Component({
  selector: 'app-storage-all-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    StatusBadgeComponent,
    PageTitleComponent,
  ],
  templateUrl: './storage-all-table-page.component.html',
})
export class StorageAllTablePageComponent {
  private readonly storageService = inject(UserStorageService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = StorageAllTable;
  protected readonly pageTitleKey = 'portal.user.pages.allStorage.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.allStorage.subtitle';
  protected readonly pageIcon = UserPageIcons.storage;
  protected readonly statusKey = storageAllStatusCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadStorage: TableLoader<Storage> = (query) =>
    this.storageService.listAll(query);

  protected onRowAction(event: RowActionEvent<Storage>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openStorageDetailModal(this.detailModalService, this.router, event.row, 'all');
        break;
      case 'sendRequest':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.storage.table.sendRequestConfirm.title',
            messageKey: 'portal.user.features.storage.table.sendRequestConfirm.message',
          })
          .pipe(take(1))
          .subscribe();
        break;
    }
  }
}
