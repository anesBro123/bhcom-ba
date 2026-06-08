export const VRSTA_VOZILA_OPTIONS = [
  { value: 'putnicko', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.putnicko' },
  { value: 'teretno', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.teretno' },
  { value: 'motocikl', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.motocikl' },
  { value: 'autobus', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.autobus' },
  { value: 'prikljucno', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.prikljucno' },
  { value: 'radno', labelKey: 'portal.admin.features.vehicles.form.vrstaVozila.radno' },
] as const;

export const VRSTA_GORIVA_OPTIONS = [
  { value: 'benzin', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.benzin' },
  { value: 'dizel', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.dizel' },
  { value: 'gas', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.gas' },
  { value: 'elektricni', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.elektricni' },
  { value: 'hibrid', labelKey: 'portal.admin.features.vehicles.form.vrstaGoriva.hibrid' },
] as const;

/** Future HTTP endpoint — swap service implementation when API is ready. */
export const ADMIN_VEHICLES_API = '/api/admin/vehicles';
