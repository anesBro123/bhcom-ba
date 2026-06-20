import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import {
  parseUserEntityTab,
  type UserEntityTab,
  userFindUrl,
  userOurListingsRoute,
} from '../../../../shared/constants/app-urls';
import {
  EntityTabsComponent,
} from '../../../../shared/ui/entity-tabs/entity-tabs.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { USER_ENTITY_TAB_CONFIG } from '../../user-entity-tabs.config';
import { UserPageIcons } from '../../user-page-icons';
import { FreightAllTablePageComponent } from '../freight/table-all/freight-all-table-page.component';
import { TransportAllTablePageComponent } from '../transport/table-all/transport-all-table-page.component';
import { WarehouseAllTablePageComponent } from '../warehouse/table-all/warehouse-all-table-page.component';

@Component({
  selector: 'app-find-page',
  imports: [
    PageTitleComponent,
    EntityTabsComponent,
    TransportAllTablePageComponent,
    FreightAllTablePageComponent,
    WarehouseAllTablePageComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './find-page.component.html',
  styleUrl: './find-page.component.scss',
})
export class FindPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageIcon = UserPageIcons.find;
  protected readonly entityTabs = USER_ENTITY_TAB_CONFIG;
  protected readonly ourListingsLink = userOurListingsRoute('transport');
  protected readonly activeTab = signal<UserEntityTab>('transport');

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => parseUserEntityTab(params.get('tab'))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((tab) => this.activeTab.set(tab));
  }

  protected onTabChange(tab: UserEntityTab): void {
    void this.router.navigateByUrl(userFindUrl(tab));
  }
}
