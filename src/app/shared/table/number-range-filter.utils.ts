import type { NumberRangeFilterValue } from './table.types';

export function isNarrowedNumberRange(
  value: NumberRangeFilterValue,
  boundMin: number,
  boundMax: number,
): boolean {
  const min = value.min ?? boundMin;
  const max = value.max ?? boundMax;
  return min > boundMin || max < boundMax;
}

export function sanitizeNumberRangeValue(
  value: NumberRangeFilterValue,
  boundMin: number,
  boundMax: number,
): NumberRangeFilterValue {
  if (!isNarrowedNumberRange(value, boundMin, boundMax)) {
    return {};
  }

  return value;
}
