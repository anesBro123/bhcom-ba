export const ADMIN_HOME_URL = '/admin/home';
export const ADMIN_SETTINGS_URL = '/admin/settings';

export const ADMIN_ENTITY_TABS = ['users', 'vehicles', 'warehouses'] as const;
export type AdminEntityTab = (typeof ADMIN_ENTITY_TABS)[number];

export function parseAdminEntityTab(value: string | null | undefined): AdminEntityTab {
  if (value === 'vehicles' || value === 'warehouses') {
    return value;
  }
  return 'users';
}

export function adminHomeUrl(tab: AdminEntityTab = 'users'): string {
  return `${ADMIN_HOME_URL}?tab=${tab}`;
}

export interface AdminEntityTabRoute {
  route: string;
  queryParams: { tab: AdminEntityTab };
}

export function adminHomeRoute(tab: AdminEntityTab = 'users'): AdminEntityTabRoute {
  return { route: ADMIN_HOME_URL, queryParams: { tab } };
}

const ADMIN_USERS_PATH = '/admin/users';
export const ADMIN_CREATE_USER_URL = `${ADMIN_USERS_PATH}/create`;

export function adminEditUserUrl(id: string): string {
  return `${ADMIN_USERS_PATH}/${id}/edit`;
}

const ADMIN_VEHICLES_PATH = '/admin/vehicles';
export const ADMIN_CREATE_VEHICLE_URL = `${ADMIN_VEHICLES_PATH}/create`;

export function adminEditVehicleUrl(id: string): string {
  return `${ADMIN_VEHICLES_PATH}/${id}/edit`;
}

const ADMIN_WAREHOUSES_PATH = '/admin/warehouses';
export const ADMIN_CREATE_WAREHOUSE_URL = `${ADMIN_WAREHOUSES_PATH}/create`;

export function adminEditWarehouseUrl(id: string): string {
  return `${ADMIN_WAREHOUSES_PATH}/${id}/edit`;
}

export function adminUserDetailUrl(id: string): string {
  return `${ADMIN_USERS_PATH}/${id}`;
}

export function adminVehicleDetailUrl(id: string): string {
  return `${ADMIN_VEHICLES_PATH}/${id}`;
}

export function adminWarehouseDetailUrl(id: string): string {
  return `${ADMIN_WAREHOUSES_PATH}/${id}`;
}
