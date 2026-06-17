import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { ADMIN_CREATE_USER_URL, adminEditUserUrl } from '../../../../../shared/constants/app-urls';
import { PageHeaderComponent } from '../../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../../shared/ui/primary-action-link/primary-action-link.component';

import {
  DataTableComponent,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { User } from '../data/user.model';
import { AdminUserService } from '../data/user.service';
import { UserTable } from './user.table';

@Component({
  selector: 'app-user-table-page',
  imports: [
    DataTableComponent,
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
  ],
  templateUrl: './user-table-page.component.html',
  styleUrl: './user-table-page.component.scss',
})
export class UserTablePageComponent {
  private readonly userService = inject(AdminUserService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = UserTable;
  protected readonly createUrl = ADMIN_CREATE_USER_URL;
  protected readonly createLabelKey = 'portal.admin.nav.createUser';
  protected readonly tableMounted = signal(true);

  protected readonly loadUsers: TableLoader<User> = (query) =>
    this.userService.list(query);

  protected onRowAction(event: RowActionEvent<User>): void {
    switch (event.actionId) {
      case 'edit':
        void this.router.navigateByUrl(adminEditUserUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.admin.features.users.table.deleteConfirm.title',
            messageKey: 'portal.admin.features.users.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.userService.delete(event.row.id)),
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
