import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  parseUserEntityTab,
  type UserEntityTab,
  userMarketplaceRoute,
  userOurListingsUrl,
} from '../../../../shared/constants/app-urls';
import { syncHubEntityTab } from '../../../../shared/utils/hub-tab-sync';
import { EntityTabsComponent } from '../../../../shared/ui/entity-tabs/entity-tabs.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../shared/ui/primary-action-link/primary-action-link.component';
import { USER_ENTITY_TAB_CONFIG } from '../../user-entity-tabs.config';
import { UserPageIcons } from '../../user-page-icons';
import { userCreateListingLabelKey } from '../../user-offer-options.config';
import { FreightOurTablePageComponent } from '../freight/table-our/freight-our-table-page.component';
import { TransportOurTablePageComponent } from '../transport/table-our/transport-our-table-page.component';
import { WarehouseOurTablePageComponent } from '../warehouse/table-our/warehouse-our-table-page.component';

@Component({
  selector: 'app-our-listings-page',
  imports: [
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
    EntityTabsComponent,
    RouterLink,
    TranslatePipe,
    TransportOurTablePageComponent,
    FreightOurTablePageComponent,
    WarehouseOurTablePageComponent,
  ],
  templateUrl: './our-listings-page.component.html',
  styleUrl: './our-listings-page.component.scss',
})
export class OurListingsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageIcon = UserPageIcons.ourListings;
  protected readonly entityTabs = USER_ENTITY_TAB_CONFIG;
  protected readonly activeTab = signal<UserEntityTab>('transport');

  protected readonly createUrl = computed(() => {
    switch (this.activeTab()) {
      case 'freight':
        return USER_CREATE_FREIGHT_URL;
      case 'warehouse':
        return USER_CREATE_WAREHOUSE_URL;
      default:
        return USER_CREATE_TRANSPORT_URL;
    }
  });

  protected readonly createLabelKey = computed(() => userCreateListingLabelKey(this.activeTab()));

  protected readonly crossLinkRoute = computed(() => userMarketplaceRoute(this.activeTab()));

  constructor() {
    syncHubEntityTab(this.route, this.destroyRef, parseUserEntityTab, this.activeTab);
  }

  protected onTabChange(tab: UserEntityTab | string): void {
    void this.router.navigateByUrl(userOurListingsUrl(tab as UserEntityTab));
  }
}
