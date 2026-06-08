export const VRSTA_VOZILA_OPTIONS = [
  { value: 'putnicko', labelKey: 'forms.adminVehicle.vrstaVozila.putnicko' },
  { value: 'teretno', labelKey: 'forms.adminVehicle.vrstaVozila.teretno' },
  { value: 'motocikl', labelKey: 'forms.adminVehicle.vrstaVozila.motocikl' },
  { value: 'autobus', labelKey: 'forms.adminVehicle.vrstaVozila.autobus' },
  { value: 'prikljucno', labelKey: 'forms.adminVehicle.vrstaVozila.prikljucno' },
  { value: 'radno', labelKey: 'forms.adminVehicle.vrstaVozila.radno' },
] as const;

export const VRSTA_GORIVA_OPTIONS = [
  { value: 'benzin', labelKey: 'forms.adminVehicle.vrstaGoriva.benzin' },
  { value: 'dizel', labelKey: 'forms.adminVehicle.vrstaGoriva.dizel' },
  { value: 'gas', labelKey: 'forms.adminVehicle.vrstaGoriva.gas' },
  { value: 'elektricni', labelKey: 'forms.adminVehicle.vrstaGoriva.elektricni' },
  { value: 'hibrid', labelKey: 'forms.adminVehicle.vrstaGoriva.hibrid' },
] as const;

/** Future HTTP endpoint — swap service implementation when API is ready. */
export const ADMIN_VEHICLES_API = '/api/admin/vehicles';
