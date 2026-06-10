import type { PortalKind } from './portal-kind.type';

export const LANDING_URL = '/';
export const SIGN_IN_URL = '/sign-in';
export const COMPANY_REGISTER_URL = '/register';
export const EMPLOYEE_LOGIN_URL = '/login';
export const ADMIN_LOGIN_URL = '/admin/login';
export const EMPLOYEE_HOME_URL = '/dashboard';
export const ADMIN_HOME_URL = '/admin/dashboard';
export const ADMIN_VEHICLES_URL = '/admin/vehicles';
export const ADMIN_CREATE_VEHICLE_URL = '/admin/vehicles/create';
export const ADMIN_EMPLOYEES_URL = '/admin/employees';
export const ADMIN_CREATE_EMPLOYEE_URL = '/admin/employees/create';
export const ADMIN_WAREHOUSES_URL = '/admin/warehouses';
export const ADMIN_CREATE_WAREHOUSE_URL = '/admin/warehouses/create';

export function portalHomeUrl(portalKind: PortalKind): string {
  return portalKind === 'admin' ? ADMIN_HOME_URL : EMPLOYEE_HOME_URL;
}

export function adminEditVehicleUrl(id: string): string {
  return `${ADMIN_VEHICLES_URL}/${id}/edit`;
}

export function adminEditEmployeeUrl(id: string): string {
  return `${ADMIN_EMPLOYEES_URL}/${id}/edit`;
}

export function adminEditWarehouseUrl(id: string): string {
  return `${ADMIN_WAREHOUSES_URL}/${id}/edit`;
}
