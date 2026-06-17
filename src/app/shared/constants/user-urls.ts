export const USER_HOME_URL = '/dashboard';

export const USER_ROUTES_URL = '/routes';
export const USER_MY_ROUTES_URL = '/routes/mine';
export const USER_CREATE_ROUTE_URL = '/routes/create';
export function userEditRouteUrl(id: string): string {
  return `${USER_ROUTES_URL}/${id}/edit`;
}

export const USER_CARGO_URL = '/cargo';
export const USER_MY_CARGO_URL = '/cargo/mine';
export const USER_CREATE_CARGO_URL = '/cargo/create';
export function userEditCargoUrl(id: string): string {
  return `${USER_CARGO_URL}/${id}/edit`;
}

export const USER_STORAGE_URL = '/storage';
export const USER_MY_STORAGE_URL = '/storage/mine';
export const USER_CREATE_STORAGE_URL = '/storage/create';
export function userEditStorageUrl(id: string): string {
  return `${USER_STORAGE_URL}/${id}/edit`;
}
