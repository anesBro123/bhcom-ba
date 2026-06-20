import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  USER_FIND_URL,
  USER_OFFER_URL,
  userFindRoute,
  userOurListingsRoute,
} from '../../../../shared/constants/app-urls';
import {
  IntentCardAction,
  IntentCardComponent,
} from '../../../../shared/ui/intent-card/intent-card.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { UserPageIcons } from '../../user-page-icons';
import { HomeCounts, HomeService } from './data/home.service';

interface JourneyCard {
  titleKey: string;
  bodyKey: string;
  icon: LucideIcon;
  actions: IntentCardAction[];
}

interface JourneyGroup {
  titleKey: string;
  cards: JourneyCard[];
}

@Component({
  selector: 'app-home-page',
  imports: [PageTitleComponent, RouterLink, TranslateModule, IntentCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly homeService = inject(HomeService);

  protected readonly pageIcon = UserPageIcons.home;
  protected readonly ourListingsLink = userOurListingsRoute('transport');
  protected readonly offerUrl = USER_OFFER_URL;
  protected readonly marketplaceTransportLink = userFindRoute('transport');
  protected readonly marketplaceFreightLink = userFindRoute('freight');
  protected readonly marketplaceWarehouseLink = userFindRoute('warehouse');

  protected readonly snapshot = signal<HomeCounts | null>(null);

  protected readonly journeyGroups: JourneyGroup[] = [
    {
      titleKey: 'portal.user.features.home.journey.groups.transport',
      cards: [
        {
          titleKey: 'portal.user.features.home.journey.moveGoods.title',
          bodyKey: 'portal.user.features.home.journey.moveGoods.body',
          icon: UserPageIcons.freight,
          actions: [
            {
              labelKey: 'portal.user.features.home.journey.moveGoods.findTransport',
              route: USER_FIND_URL,
              queryParams: { tab: 'transport' },
            },
            {
              labelKey: 'portal.user.features.home.journey.moveGoods.offerFreight',
              route: USER_CREATE_FREIGHT_URL,
            },
          ],
        },
        {
          titleKey: 'portal.user.features.home.journey.transportCapacity.title',
          bodyKey: 'portal.user.features.home.journey.transportCapacity.body',
          icon: UserPageIcons.transport,
          actions: [
            {
              labelKey: 'portal.user.features.home.journey.transportCapacity.findFreight',
              route: USER_FIND_URL,
              queryParams: { tab: 'freight' },
            },
            {
              labelKey: 'portal.user.features.home.journey.transportCapacity.offerTransport',
              route: USER_CREATE_TRANSPORT_URL,
            },
          ],
        },
      ],
    },
    {
      titleKey: 'portal.user.features.home.journey.groups.warehouse',
      cards: [
        {
          titleKey: 'portal.user.features.home.journey.needWarehouse.title',
          bodyKey: 'portal.user.features.home.journey.needWarehouse.body',
          icon: UserPageIcons.warehouse,
          actions: [
            {
              labelKey: 'portal.user.features.home.journey.needWarehouse.findWarehouse',
              route: USER_FIND_URL,
              queryParams: { tab: 'warehouse' },
            },
          ],
        },
        {
          titleKey: 'portal.user.features.home.journey.haveWarehouse.title',
          bodyKey: 'portal.user.features.home.journey.haveWarehouse.body',
          icon: UserPageIcons.warehouse,
          actions: [
            {
              labelKey: 'portal.user.features.home.journey.haveWarehouse.offerWarehouse',
              route: USER_CREATE_WAREHOUSE_URL,
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    this.homeService.getSnapshot().subscribe({
      next: (counts) => this.snapshot.set(counts),
    });
  }
}
