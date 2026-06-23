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

export function clampNumberRange(
  partial: NumberRangeFilterValue,
  boundMin: number,
  boundMax: number,
  changed: 'min' | 'max',
): NumberRangeFilterValue {
  let min = partial.min;
  let max = partial.max;

  if (min !== undefined && !Number.isNaN(min)) {
    min = Math.max(boundMin, Math.min(boundMax, min));
  } else {
    min = undefined;
  }

  if (max !== undefined && !Number.isNaN(max)) {
    max = Math.max(boundMin, Math.min(boundMax, max));
  } else {
    max = undefined;
  }

  if (min !== undefined && max !== undefined && min > max) {
    if (changed === 'min') {
      min = max;
    } else {
      max = min;
    }
  }

  const cleaned: NumberRangeFilterValue = {};
  if (min !== undefined) {
    cleaned.min = min;
  }
  if (max !== undefined) {
    cleaned.max = max;
  }

  return cleaned;
}

export function valueFromTrackPercent(
  percent: number,
  boundMin: number,
  boundMax: number,
  step: number,
): number {
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const span = boundMax - boundMin;
  if (span <= 0) {
    return boundMin;
  }

  const raw = boundMin + (clampedPercent / 100) * span;
  const stepped = Math.round((raw - boundMin) / step) * step + boundMin;
  return Math.max(boundMin, Math.min(boundMax, stepped));
}
