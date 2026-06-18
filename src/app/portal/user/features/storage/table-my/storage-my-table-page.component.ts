import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { DetailModalService } from '../../../../../shared/detail-modal';
import {
  USER_CREATE_STORAGE_URL,
  userEditStorageUrl,
} from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
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
import { StorageMyTable, storageMyStatusCellKey } from './storage-my.table';

@Component({
  selector: 'app-storage-my-table-page',
  imports: [
    DataTableComponent,
    TableCellTemplateDirective,
    StatusBadgeComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './storage-my-table-page.component.html',
})
export class StorageMyTablePageComponent {
  private readonly storageService = inject(UserStorageService);
  private readonly confirmService = inject(ConfirmService);
  private readonly detailModalService = inject(DetailModalService);
  private readonly router = inject(Router);

  protected readonly table = StorageMyTable;
  protected readonly pageTitleKey = 'portal.user.pages.myStorage.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.myStorage.subtitle';
  protected readonly pageIcon = UserPageIcons.storage;
  protected readonly createUrl = USER_CREATE_STORAGE_URL;
  protected readonly createLabelKey = 'portal.user.nav.postStorage';
  protected readonly statusKey = storageMyStatusCellKey;
  protected readonly tableMounted = signal(true);

  protected readonly loadStorage: TableLoader<Storage> = (query) =>
    this.storageService.listMine(query);

  protected onRowAction(event: RowActionEvent<Storage>): void {
    switch (event.actionId) {
      case 'viewDetails':
        openStorageDetailModal(this.detailModalService, this.router, event.row, 'my');
        break;
      case 'edit':
        void this.router.navigateByUrl(userEditStorageUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.user.features.storage.table.deleteConfirm.title',
            messageKey: 'portal.user.features.storage.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.storageService.delete(event.row.id)),
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
