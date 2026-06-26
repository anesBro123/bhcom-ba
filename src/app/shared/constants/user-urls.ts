export const USER_HOME_URL = '/home';
export const USER_OUR_LISTINGS_URL = '/our-listings';

export const USER_ENTITY_TABS = ['transport', 'freight', 'warehouse'] as const;
export type UserEntityTab = (typeof USER_ENTITY_TABS)[number];

export function parseUserEntityTab(value: string | null | undefined): UserEntityTab {
  if (value === 'freight' || value === 'warehouse') {
    return value;
  }
  return 'transport';
}

export function userMarketplaceUrl(tab: UserEntityTab = 'transport'): string {
  return `${USER_HOME_URL}?tab=${tab}`;
}

/** @deprecated Use userMarketplaceUrl */
export const userSearchUrl = userMarketplaceUrl;

export function userOurListingsUrl(tab: UserEntityTab = 'transport'): string {
  return `${USER_OUR_LISTINGS_URL}?tab=${tab}`;
}

/** For `[routerLink]` — do not pass marketplace/our-listings URL strings (query gets encoded into the path). */
export interface UserEntityTabRoute {
  route: string;
  queryParams: { tab: UserEntityTab };
}

export function userMarketplaceRoute(tab: UserEntityTab = 'transport'): UserEntityTabRoute {
  return { route: USER_HOME_URL, queryParams: { tab } };
}

/** @deprecated Use userMarketplaceRoute */
export const userSearchRoute = userMarketplaceRoute;

export function userOurListingsRoute(tab: UserEntityTab = 'transport'): UserEntityTabRoute {
  return { route: USER_OUR_LISTINGS_URL, queryParams: { tab } };
}

const USER_TRANSPORT_PATH = '/transport';
export const USER_CREATE_TRANSPORT_URL = `${USER_TRANSPORT_PATH}/create`;
export function userTransportDetailUrl(id: string): string {
  return `${USER_TRANSPORT_PATH}/${id}`;
}

export function userEditTransportUrl(id: string): string {
  return `${USER_TRANSPORT_PATH}/${id}/edit`;
}

const USER_FREIGHT_PATH = '/freight';
export const USER_CREATE_FREIGHT_URL = `${USER_FREIGHT_PATH}/create`;
export function userFreightDetailUrl(id: string): string {
  return `${USER_FREIGHT_PATH}/${id}`;
}

export function userEditFreightUrl(id: string): string {
  return `${USER_FREIGHT_PATH}/${id}/edit`;
}

const USER_WAREHOUSE_PATH = '/warehouse';
export const USER_CREATE_WAREHOUSE_URL = `${USER_WAREHOUSE_PATH}/create`;
export function userWarehouseDetailUrl(id: string): string {
  return `${USER_WAREHOUSE_PATH}/${id}`;
}

export function userEditWarehouseUrl(id: string): string {
  return `${USER_WAREHOUSE_PATH}/${id}/edit`;
}
