import { Router } from '@angular/router';

import { belongsToCompany } from '../../../shared/constants/user-list-scope';
import {
  userFindUrl,
  userOurListingsUrl,
  type UserEntityTab,
} from '../../../shared/constants/user-urls';

export type EntityDetailOrigin = 'find' | 'our';

export interface EntityDetailNavigationState {
  detailOrigin?: EntityDetailOrigin;
}

const OUR_LISTINGS_BACK_LABEL_KEYS: Record<UserEntityTab, string> = {
  transport: 'portal.user.nav.ourTransport',
  freight: 'portal.user.nav.ourFreight',
  warehouse: 'portal.user.nav.ourWarehouse',
};

export function navigateToEntityDetail(
  router: Router,
  detailUrl: string,
  origin: EntityDetailOrigin,
): void {
  void router.navigateByUrl(detailUrl, { state: { detailOrigin: origin } satisfies EntityDetailNavigationState });
}

export function readEntityDetailOrigin(): EntityDetailOrigin | undefined {
  const state = history.state as EntityDetailNavigationState | null;
  return state?.detailOrigin;
}

export function resolveDetailBack(
  tab: UserEntityTab,
  isOwnListing: boolean,
  origin?: EntityDetailOrigin,
): { url: string; labelKey: string } {
  if (origin === 'find') {
    return { url: userFindUrl(tab), labelKey: 'portal.user.nav.find' };
  }

  if (origin === 'our') {
    return { url: userOurListingsUrl(tab), labelKey: OUR_LISTINGS_BACK_LABEL_KEYS[tab] };
  }

  if (isOwnListing) {
    return { url: userOurListingsUrl(tab), labelKey: OUR_LISTINGS_BACK_LABEL_KEYS[tab] };
  }

  return { url: userFindUrl(tab), labelKey: 'portal.user.nav.find' };
}

export function isOwnListingEntity(
  entity: { companyId: string },
  companyId: string,
): boolean {
  return belongsToCompany(entity, companyId);
}

export type EntityDetailPageKey = 'viewTransport' | 'viewFreight' | 'viewWarehouse';

export function resolveDetailSubtitleKey(
  pageKey: EntityDetailPageKey,
  isOwnListing: boolean,
  origin?: EntityDetailOrigin,
): string {
  const isOurContext = origin === 'our' || (origin !== 'find' && isOwnListing);
  const suffix = isOurContext ? 'subtitleOur' : 'subtitleFind';

  return `portal.user.pages.${pageKey}.${suffix}`;
}
