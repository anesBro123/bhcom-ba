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
import type { UserEntityTab } from '../../../../shared/constants/user-urls';
import {
  IntentCardAction,
  IntentCardComponent,
} from '../../../../shared/ui/intent-card/intent-card.component';
import { QuickActionCardComponent } from '../../../../shared/ui/quick-action-card/quick-action-card.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { UserPageIcons } from '../../user-page-icons';
import { HomeCounts, HomeService } from './data/home.service';
import { HOME_ENTITY_ACTION_GROUPS } from './home.actions.config';

interface JourneyCard {
  titleKey: string;
  bodyKey: string;
  icon: LucideIcon;
  actions: IntentCardAction[];
}

interface JourneyGroup {
  titleKey: string;
  entityTab: UserEntityTab;
  cards: JourneyCard[];
}

const JOURNEY_CONTINUE_LABEL_KEY = 'portal.user.features.offer.continue';

@Component({
  selector: 'app-home-page',
  imports: [
    PageTitleComponent,
    RouterLink,
    TranslateModule,
    QuickActionCardComponent,
    IntentCardComponent,
  ],
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
  protected readonly entityActionGroups = HOME_ENTITY_ACTION_GROUPS;

  protected readonly snapshot = signal<HomeCounts | null>(null);

  protected readonly journeyGroups: JourneyGroup[] = [
    {
      titleKey: 'portal.user.features.home.journey.groups.transport',
      entityTab: 'transport',
      cards: [
        {
          titleKey: 'portal.user.features.home.journey.needTransport.title',
          bodyKey: 'portal.user.features.home.journey.needTransport.body',
          icon: UserPageIcons.transport,
          actions: [
            {
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
              route: USER_FIND_URL,
              queryParams: { tab: 'transport' },
            },
          ],
        },
        {
          titleKey: 'portal.user.features.home.journey.haveTransport.title',
          bodyKey: 'portal.user.features.home.journey.haveTransport.body',
          icon: UserPageIcons.transport,
          actions: [
            {
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
              route: USER_CREATE_TRANSPORT_URL,
            },
          ],
        },
      ],
    },
    {
      titleKey: 'portal.user.features.home.journey.groups.freight',
      entityTab: 'freight',
      cards: [
        {
          titleKey: 'portal.user.features.home.journey.needFreight.title',
          bodyKey: 'portal.user.features.home.journey.needFreight.body',
          icon: UserPageIcons.freight,
          actions: [
            {
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
              route: USER_FIND_URL,
              queryParams: { tab: 'freight' },
            },
          ],
        },
        {
          titleKey: 'portal.user.features.home.journey.haveFreight.title',
          bodyKey: 'portal.user.features.home.journey.haveFreight.body',
          icon: UserPageIcons.freight,
          actions: [
            {
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
              route: USER_CREATE_FREIGHT_URL,
            },
          ],
        },
      ],
    },
    {
      titleKey: 'portal.user.features.home.journey.groups.warehouse',
      entityTab: 'warehouse',
      cards: [
        {
          titleKey: 'portal.user.features.home.journey.needWarehouse.title',
          bodyKey: 'portal.user.features.home.journey.needWarehouse.body',
          icon: UserPageIcons.warehouse,
          actions: [
            {
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
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
              labelKey: JOURNEY_CONTINUE_LABEL_KEY,
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
