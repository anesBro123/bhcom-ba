import type { TranslateService } from '@ngx-translate/core';

import { formatDisplayDate } from '../utils/format-display-date';
import type { UserEntityStatus } from '../constants/user-entity-status';

import { isNarrowedNumberRange } from './number-range-filter.utils';
import type {
  DateRangeFilterValue,
  FilterDef,
  FilterOption,
  NumberRangeFilterValue,
} from './table.types';

export interface FilterChip {
  filterKey: string;
  titleKey: string;
  valueKey?: string;
  valueText?: string;
  statuses?: UserEntityStatus[];
}

export function buildFilterChips<T>(
  filters: FilterDef<T>[],
  values: Record<string, unknown>,
  translate: TranslateService,
): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const filter of filters) {
    const raw = values[filter.key];
    if (!isActiveFilterValue(filter, raw)) {
      continue;
    }

    switch (filter.type) {
      case 'search':
        chips.push({
          filterKey: filter.key,
          titleKey: filter.titleKey,
          valueText: String(raw),
        });
        break;

      case 'select':
        chips.push({
          filterKey: filter.key,
          titleKey: filter.titleKey,
          valueText: optionLabel(filter.options, String(raw), translate),
        });
        break;

      case 'multiSelect': {
        const selected = raw as string[];
        const chip: FilterChip = {
          filterKey: filter.key,
          titleKey: filter.titleKey,
        };

        if (filter.showStatusBadges) {
          chip.statuses = selected as UserEntityStatus[];
        } else {
          chip.valueText = selected
            .map((value) => optionLabel(filter.options, value, translate))
            .join(', ');
        }

        chips.push(chip);
        break;
      }

      case 'dateRange': {
        const range = raw as DateRangeFilterValue;
        const from = range.from ? formatDisplayDate(range.from) : '…';
        const to = range.to ? formatDisplayDate(range.to) : '…';
        chips.push({
          filterKey: filter.key,
          titleKey: filter.titleKey,
          valueText: `${from} – ${to}`,
        });
        break;
      }

      case 'numberRange': {
        const range = raw as NumberRangeFilterValue;
        if (!isNarrowedNumberRange(range, filter.min, filter.max)) {
          break;
        }

        const min = range.min ?? filter.min;
        const max = range.max ?? filter.max;
        const unit = filter.unitSuffixKey ? translate.instant(filter.unitSuffixKey) : '';
        const rangeText = `${formatChipRangeNumber(min, filter.step)} - ${formatChipRangeNumber(max, filter.step)}`;
        chips.push({
          filterKey: filter.key,
          titleKey: filter.chipTitleKey ?? filter.titleKey,
          valueText: unit ? `${rangeText} ${unit}` : rangeText,
        });
        break;
      }
    }
  }

  return chips;
}

function isActiveFilterValue<T>(filter: FilterDef<T>, value: unknown): boolean {
  if (value === undefined || value === null || value === '') {
    return false;
  }

  switch (filter.type) {
    case 'search':
    case 'select':
      return true;

    case 'multiSelect':
      return Array.isArray(value) && value.length > 0;

    case 'dateRange': {
      const range = value as DateRangeFilterValue;
      return Boolean(range.from || range.to);
    }

    case 'numberRange':
      return isNarrowedNumberRange(value as NumberRangeFilterValue, filter.min, filter.max);

    default:
      return false;
  }
}

function optionLabel(options: FilterOption[], value: string, translate: TranslateService): string {
  const option = options.find((item) => item.value === value);
  if (!option) {
    return value;
  }

  if (option.labelKey) {
    return translate.instant(option.labelKey);
  }

  return option.label ?? value;
}

function formatChipRangeNumber(value: number, step = 1): string {
  const decimals = step < 1 ? (String(step).split('.')[1]?.length ?? 1) : 0;

  if (decimals === 0 && Number.isInteger(value)) {
    return String(value);
  }

  return new Intl.NumberFormat(undefined, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals || 1,
  }).format(value);
}
