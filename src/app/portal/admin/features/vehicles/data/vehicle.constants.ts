export { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';

export const VRSTA_GORIVA_OPTIONS = [
  { value: 'benzin', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.benzin' },
  { value: 'dizel', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.dizel' },
  { value: 'gas', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.gas' },
  { value: 'elektricni', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.elektricni' },
  { value: 'hibrid', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.hibrid' },
] as const;

/** Future HTTP endpoint — swap service implementation when API is ready. */
export const ADMIN_VEHICLES_API = '/api/admin/vehicles';
