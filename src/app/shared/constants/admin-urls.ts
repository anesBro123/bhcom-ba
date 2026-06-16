export const ADMIN_HOME_URL = '/admin/dashboard';
export const ADMIN_VEHICLES_URL = '/admin/vehicles';
export const ADMIN_CREATE_VEHICLE_URL = '/admin/vehicles/create';
export const ADMIN_USERS_URL = '/admin/users';
export const ADMIN_CREATE_USER_URL = '/admin/users/create';
export const ADMIN_WAREHOUSES_URL = '/admin/warehouses';
export const ADMIN_CREATE_WAREHOUSE_URL = '/admin/warehouses/create';

export function adminEditVehicleUrl(id: string): string {
  return `${ADMIN_VEHICLES_URL}/${id}/edit`;
}

export function adminEditUserUrl(id: string): string {
  return `${ADMIN_USERS_URL}/${id}/edit`;
}

export function adminEditWarehouseUrl(id: string): string {
  return `${ADMIN_WAREHOUSES_URL}/${id}/edit`;
}
