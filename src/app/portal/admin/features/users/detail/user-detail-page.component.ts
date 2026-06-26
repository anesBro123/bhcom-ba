import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import {
  adminEditUserUrl,
  adminHomeUrl,
} from '../../../../../shared/constants/app-urls';
import {
  buildAdminDetailPageActions,
  DETAIL_ACTION_DELETE,
  DetailViewComponent,
} from '../../../../../shared/detail';
import { EntityDetailSummaryComponent } from '../../../../../shared/ui/entity-detail-summary/entity-detail-summary.component';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { DetailActionBarComponent } from '../../../../../shared/ui/detail-action-bar/detail-action-bar.component';
import { DetailPageLayoutComponent } from '../../../../../shared/ui/detail-page-layout/detail-page-layout.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import {
  resolveAdminDetailBack,
  resolveAdminDetailSubtitleKey,
} from '../../../common/admin-entity-detail-navigation';
import { AdminPageIcons } from '../../../admin-page-icons';
import type { User } from '../data/user.model';
import { AdminUserService } from '../data/user.service';
import { UserDetail } from './user.detail';

@Component({
  selector: 'app-user-detail-page',
  imports: [
    TranslatePipe,
    PageBackLinkComponent,
    PageTitleComponent,
    DetailPageLayoutComponent,
    DetailActionBarComponent,
    EntityDetailSummaryComponent,
    DetailViewComponent,
  ],
  templateUrl: './user-detail-page.component.html',
  styleUrl: './user-detail-page.component.scss',
})
export class UserDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(AdminUserService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly UserDetail = UserDetail;
  protected readonly pageTitleKey = 'portal.admin.pages.viewUser.title';
  protected readonly pageIcon = AdminPageIcons.users;

  protected readonly entity = signal<User | null>(null);
  protected readonly loading = signal(true);

  protected readonly back = computed(() => resolveAdminDetailBack('users'));
  protected readonly pageSubtitleKey = computed(() => resolveAdminDetailSubtitleKey('users'));

  protected readonly detailActions = computed(() => {
    const item = this.entity();
    if (!item) {
      return [];
    }

    return buildAdminDetailPageActions('users', {
      editRoute: adminEditUserUrl(item.id),
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigateByUrl(adminHomeUrl('users'));
      return;
    }

    this.userService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          this.entity.set(item);
          this.loading.set(false);
        },
        error: () => {
          void this.router.navigateByUrl(adminHomeUrl('users'));
        },
      });
  }

  protected onDetailAction(actionId: string): void {
    const item = this.entity();
    if (!item) {
      return;
    }

    if (actionId === DETAIL_ACTION_DELETE) {
      this.confirmService
        .confirm({
          titleKey: 'portal.admin.features.users.table.deleteConfirm.title',
          messageKey: 'portal.admin.features.users.table.deleteConfirm.message',
          danger: true,
        })
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => this.userService.delete(item.id)),
        )
        .subscribe({
          next: () => {
            void this.router.navigateByUrl(adminHomeUrl('users'));
          },
        });
    }
  }
}
