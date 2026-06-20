import type { FreightType } from './freight.model';

export const USER_FREIGHT_API = '/api/user/freight';

export const FREIGHT_TYPE_OPTIONS: { value: FreightType; labelKey: string }[] = [
  { value: 'pallet', labelKey: 'portal.user.features.freight.form.freightTypes.pallet' },
  { value: 'bulk', labelKey: 'portal.user.features.freight.form.freightTypes.bulk' },
  { value: 'refrigerated', labelKey: 'portal.user.features.freight.form.freightTypes.refrigerated' },
  { value: 'oversized', labelKey: 'portal.user.features.freight.form.freightTypes.oversized' },
  { value: 'other', labelKey: 'portal.user.features.freight.form.freightTypes.other' },
];

export type FreightSizeUnit = 'pallets' | 'm3' | 'units';

export const FREIGHT_SIZE_UNIT_BY_TYPE: Record<FreightType, FreightSizeUnit> = {
  pallet: 'pallets',
  bulk: 'm3',
  refrigerated: 'm3',
  oversized: 'units',
  other: 'units',
};

export function freightSizeUnitLabelKey(freightType: FreightType, size: number | null): string {
  const unit = FREIGHT_SIZE_UNIT_BY_TYPE[freightType];
  if (unit === 'units' && size === 1) {
    return 'portal.user.features.freight.form.sizeUnits.unit';
  }

  return `portal.user.features.freight.form.sizeUnits.${unit}`;
}

export function freightSizeStep(freightType: FreightType): number {
  return freightType === 'bulk' || freightType === 'refrigerated' ? 0.5 : 1;
}
