export const USER_HOME_URL = '/home';

export const USER_TRANSPORT_URL = '/transport';
export const USER_OUR_TRANSPORT_URL = '/transport/our';
export const USER_CREATE_TRANSPORT_URL = '/transport/create';
export function userEditTransportUrl(id: string): string {
  return `${USER_TRANSPORT_URL}/${id}/edit`;
}

export const USER_FREIGHT_URL = '/freight';
export const USER_OUR_FREIGHT_URL = '/freight/our';
export const USER_CREATE_FREIGHT_URL = '/freight/create';
export function userEditFreightUrl(id: string): string {
  return `${USER_FREIGHT_URL}/${id}/edit`;
}

export const USER_WAREHOUSE_URL = '/warehouse';
export const USER_OUR_WAREHOUSE_URL = '/warehouse/our';
export const USER_CREATE_WAREHOUSE_URL = '/warehouse/create';
export function userEditWarehouseUrl(id: string): string {
  return `${USER_WAREHOUSE_URL}/${id}/edit`;
}

export const USER_OFFER_URL = '/offer';
