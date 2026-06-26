import { Router } from '@angular/router';

import { belongsToCompany } from '../../../shared/constants/user-list-scope';
import {
  userOurListingsUrl,
  userMarketplaceUrl,
  type UserEntityTab,
} from '../../../shared/constants/user-urls';

export type EntityDetailOrigin = 'search' | 'our';

export interface EntityDetailNavigationState {
  detailOrigin?: EntityDetailOrigin;
}

export const MARKETPLACE_BACK_LABEL_KEY = 'portal.user.nav.search';
/** @deprecated Use MARKETPLACE_BACK_LABEL_KEY */
export const SEARCH_BACK_LABEL_KEY = MARKETPLACE_BACK_LABEL_KEY;
export const OUR_LISTINGS_BACK_LABEL_KEY = 'portal.user.nav.ourListings';

export function navigateToEntityDetail(
  router: Router,
  detailUrl: string,
  origin: EntityDetailOrigin,
): void {
  void router.navigateByUrl(detailUrl, { state: { detailOrigin: origin } satisfies EntityDetailNavigationState });
}

export function readEntityDetailOrigin(): EntityDetailOrigin | undefined {
  const state = history.state as EntityDetailNavigationState | null;
  const origin = state?.detailOrigin;
  if ((origin as string | undefined) === 'find') {
    return 'search';
  }
  return origin;
}

export function isOurListingsContext(
  isOwnListing: boolean,
  origin?: EntityDetailOrigin,
): boolean {
  return origin === 'our' || (origin !== 'search' && isOwnListing);
}

export function resolveDetailBack(
  tab: UserEntityTab,
  isOwnListing: boolean,
  origin?: EntityDetailOrigin,
): { url: string; labelKey: string } {
  if (isOurListingsContext(isOwnListing, origin)) {
    return { url: userOurListingsUrl(tab), labelKey: OUR_LISTINGS_BACK_LABEL_KEY };
  }

  return { url: userMarketplaceUrl(tab), labelKey: MARKETPLACE_BACK_LABEL_KEY };
}

export function isOwnListingEntity(
  entity: { companyId: string },
  companyId: string,
): boolean {
  return belongsToCompany(entity, companyId);
}

export function resolveDetailSubtitleKey(
  isOwnListing: boolean,
  origin?: EntityDetailOrigin,
): string {
  const suffix = isOurListingsContext(isOwnListing, origin) ? 'subtitleOur' : 'subtitleSearch';

  return `portal.user.pages.listingDetail.${suffix}`;
}
