import type { CargoType } from './cargo.model';

export const USER_CARGO_API = '/api/user/cargo';

export const CARGO_TYPE_OPTIONS: { value: CargoType; labelKey: string }[] = [
  { value: 'pallet', labelKey: 'portal.user.features.cargo.form.cargoTypes.pallet' },
  { value: 'bulk', labelKey: 'portal.user.features.cargo.form.cargoTypes.bulk' },
  { value: 'refrigerated', labelKey: 'portal.user.features.cargo.form.cargoTypes.refrigerated' },
  { value: 'oversized', labelKey: 'portal.user.features.cargo.form.cargoTypes.oversized' },
  { value: 'other', labelKey: 'portal.user.features.cargo.form.cargoTypes.other' },
];
