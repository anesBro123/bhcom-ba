import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import {
  USER_CREATE_FREIGHT_URL,
  USER_CREATE_TRANSPORT_URL,
  USER_CREATE_WAREHOUSE_URL,
  USER_HOME_URL,
} from '../../../../shared/constants/app-urls';
import type { UserEntityTab } from '../../../../shared/constants/user-urls';
import {
  IntentCardAction,
  IntentCardComponent,
} from '../../../../shared/ui/intent-card/intent-card.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { UserPageIcons } from '../../user-page-icons';

interface OfferOption {
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  entityTab: UserEntityTab;
  actions: IntentCardAction[];
}

@Component({
  selector: 'app-offer-page',
  imports: [PageTitleComponent, RouterLink, TranslateModule, IntentCardComponent],
  templateUrl: './offer-page.component.html',
  styleUrl: './offer-page.component.scss',
})
export class OfferPageComponent {
  protected readonly pageIcon = UserPageIcons.offer;
  protected readonly homeUrl = USER_HOME_URL;

  protected readonly options: OfferOption[] = [
    {
      titleKey: 'portal.user.features.offer.transport.title',
      descriptionKey: 'portal.user.features.offer.transport.description',
      icon: UserPageIcons.transport,
      entityTab: 'transport',
      actions: [
        {
          labelKey: 'portal.user.features.offer.continue',
          route: USER_CREATE_TRANSPORT_URL,
        },
      ],
    },
    {
      titleKey: 'portal.user.features.offer.freight.title',
      descriptionKey: 'portal.user.features.offer.freight.description',
      icon: UserPageIcons.freight,
      entityTab: 'freight',
      actions: [
        {
          labelKey: 'portal.user.features.offer.continue',
          route: USER_CREATE_FREIGHT_URL,
        },
      ],
    },
    {
      titleKey: 'portal.user.features.offer.warehouse.title',
      descriptionKey: 'portal.user.features.offer.warehouse.description',
      icon: UserPageIcons.warehouse,
      entityTab: 'warehouse',
      actions: [
        {
          labelKey: 'portal.user.features.offer.continue',
          route: USER_CREATE_WAREHOUSE_URL,
        },
      ],
    },
  ];
}
