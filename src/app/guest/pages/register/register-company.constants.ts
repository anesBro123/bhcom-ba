import type { PersonTitle } from './register-company.model';

export const TITLE_OPTIONS: { value: PersonTitle; labelKey: string }[] = [
  { value: 'mr', labelKey: 'guest.register.form.titles.mr' },
  { value: 'ms', labelKey: 'guest.register.form.titles.ms' },
];

export const COUNTRY_OPTIONS: { value: string; labelKey: string }[] = [
  { value: 'BA', labelKey: 'guest.register.form.countries.BA' },
  { value: 'RS', labelKey: 'guest.register.form.countries.RS' },
  { value: 'HR', labelKey: 'guest.register.form.countries.HR' },
  { value: 'ME', labelKey: 'guest.register.form.countries.ME' },
  { value: 'MK', labelKey: 'guest.register.form.countries.MK' },
  { value: 'AL', labelKey: 'guest.register.form.countries.AL' },
  { value: 'SI', labelKey: 'guest.register.form.countries.SI' },
  { value: 'DE', labelKey: 'guest.register.form.countries.DE' },
  { value: 'AT', labelKey: 'guest.register.form.countries.AT' },
  { value: 'IT', labelKey: 'guest.register.form.countries.IT' },
  { value: 'FR', labelKey: 'guest.register.form.countries.FR' },
  { value: 'NL', labelKey: 'guest.register.form.countries.NL' },
  { value: 'BE', labelKey: 'guest.register.form.countries.BE' },
  { value: 'CH', labelKey: 'guest.register.form.countries.CH' },
  { value: 'GB', labelKey: 'guest.register.form.countries.GB' },
  { value: 'PL', labelKey: 'guest.register.form.countries.PL' },
  { value: 'CZ', labelKey: 'guest.register.form.countries.CZ' },
  { value: 'HU', labelKey: 'guest.register.form.countries.HU' },
  { value: 'RO', labelKey: 'guest.register.form.countries.RO' },
  { value: 'BG', labelKey: 'guest.register.form.countries.BG' },
  { value: 'GR', labelKey: 'guest.register.form.countries.GR' },
  { value: 'ES', labelKey: 'guest.register.form.countries.ES' },
  { value: 'PT', labelKey: 'guest.register.form.countries.PT' },
  { value: 'SE', labelKey: 'guest.register.form.countries.SE' },
  { value: 'DK', labelKey: 'guest.register.form.countries.DK' },
];
