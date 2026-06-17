import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  USER_CREATE_STORAGE_URL,
  userEditStorageUrl,
} from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';
import {
  DataTableComponent,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Storage } from '../data/storage.model';
import { UserStorageService } from '../data/storage.service';
import { UserPageIcons } from '../../../user-page-icons';
import { StorageTable } from './storage.table';

@Component({
  selector: 'app-storage-table-page',
  imports: [
    DataTableComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './storage-table-page.component.html',
  styleUrl: './storage-table-page.component.scss',
})
export class StorageTablePageComponent {
  private readonly storageService = inject(UserStorageService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = StorageTable;
  protected readonly pageTitleKey = 'portal.user.pages.storage.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.storage.subtitle';
  protected readonly pageIcon = UserPageIcons.storage;
  protected readonly createUrl = USER_CREATE_STORAGE_URL;
  protected readonly createLabelKey = 'portal.user.nav.postStorage';
  protected readonly tableMounted = signal(true);

  protected readonly loadStorage: TableLoader<Storage> = (query) => this.storageService.list(query);

  protected onRowAction(event: RowActionEvent<Storage>): void {
    switch (event.actionId) {
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
