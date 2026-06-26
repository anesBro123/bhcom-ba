import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  parseUserEntityTab,
  type UserEntityTab,
  userMarketplaceUrl,
  userOurListingsRoute,
} from '../../../../shared/constants/app-urls';
import { EntityTabsComponent } from '../../../../shared/ui/entity-tabs/entity-tabs.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../shared/ui/primary-action-link/primary-action-link.component';
import { USER_ENTITY_TAB_CONFIG } from '../../user-entity-tabs.config';
import { UserPageIcons } from '../../user-page-icons';
import { userCreateListingLabelKey } from '../../user-offer-options.config';
import { FreightAllTablePageComponent } from '../freight/table-all/freight-all-table-page.component';
import { TransportAllTablePageComponent } from '../transport/table-all/transport-all-table-page.component';
import { WarehouseAllTablePageComponent } from '../warehouse/table-all/warehouse-all-table-page.component';

@Component({
  selector: 'app-home-page',
  imports: [
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
    EntityTabsComponent,
    RouterLink,
    TranslatePipe,
    TransportAllTablePageComponent,
    FreightAllTablePageComponent,
    WarehouseAllTablePageComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageIcon = UserPageIcons.marketplace;
  protected readonly entityTabs = USER_ENTITY_TAB_CONFIG;
  protected readonly activeTab = signal<UserEntityTab>('transport');

  protected readonly offerUrl = computed(() => {
    switch (this.activeTab()) {
      case 'freight':
        return USER_CREATE_FREIGHT_URL;
      case 'warehouse':
        return USER_CREATE_WAREHOUSE_URL;
      default:
        return USER_CREATE_TRANSPORT_URL;
    }
  });

  protected readonly offerLabelKey = computed(() => userCreateListingLabelKey(this.activeTab()));

  protected readonly crossLinkRoute = computed(() => userOurListingsRoute(this.activeTab()));

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((params) => parseUserEntityTab(params.get('tab'))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((tab) => this.activeTab.set(tab));
  }

  protected onTabChange(tab: UserEntityTab | string): void {
    void this.router.navigateByUrl(userMarketplaceUrl(tab as UserEntityTab));
  }
}
