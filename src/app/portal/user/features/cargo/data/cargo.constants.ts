import type { CargoType } from './cargo.model';

export const USER_CARGO_API = '/api/user/cargo';

export const CARGO_TYPE_OPTIONS: { value: CargoType; labelKey: string }[] = [
  { value: 'pallet', labelKey: 'portal.user.features.cargo.form.cargoTypes.pallet' },
  { value: 'bulk', labelKey: 'portal.user.features.cargo.form.cargoTypes.bulk' },
  { value: 'refrigerated', labelKey: 'portal.user.features.cargo.form.cargoTypes.refrigerated' },
  { value: 'oversized', labelKey: 'portal.user.features.cargo.form.cargoTypes.oversized' },
  { value: 'other', labelKey: 'portal.user.features.cargo.form.cargoTypes.other' },
];

export type CargoSizeUnit = 'pallets' | 'm3' | 'units';

export const CARGO_SIZE_UNIT_BY_TYPE: Record<CargoType, CargoSizeUnit> = {
  pallet: 'pallets',
  bulk: 'm3',
  refrigerated: 'm3',
  oversized: 'units',
  other: 'units',
};

export function cargoSizeUnitLabelKey(cargoType: CargoType, size: number | null): string {
  const unit = CARGO_SIZE_UNIT_BY_TYPE[cargoType];
  if (unit === 'units' && size === 1) {
    return 'portal.user.features.cargo.form.sizeUnits.unit';
  }

  return `portal.user.features.cargo.form.sizeUnits.${unit}`;
}

export function cargoSizeStep(cargoType: CargoType): number {
  return cargoType === 'bulk' || cargoType === 'refrigerated' ? 0.5 : 1;
}
