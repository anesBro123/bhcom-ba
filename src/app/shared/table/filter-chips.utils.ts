import type { TranslateService } from '@ngx-translate/core';

import { formatDisplayDate } from '../utils/format-display-date';
import { isUserEntityStatus, type UserEntityStatus } from '../constants/user-entity-status';
import { isVehicleType, type VehicleType } from '../constants/vehicle-type';

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
  vehicleTypes?: VehicleType[];
}

export interface FilterSummary {
  text: string;
  isPlaceholder: boolean;
  labels?: string[];
  statuses?: UserEntityStatus[];
  vehicleTypes?: VehicleType[];
  overflowCount?: number;
}

export const FILTER_SUMMARY_MAX_VISIBLE = 3;
export const FILTER_SUMMARY_TEXT_MAX_VISIBLE = 2;

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

      case 'multiSelect':
      case 'optionTiles': {
        const selected = raw as string[];
        const chip: FilterChip = {
          filterKey: filter.key,
          titleKey: filter.titleKey,
        };

        if (filter.showStatusBadges) {
          chip.statuses = selected.filter(isUserEntityStatus) as UserEntityStatus[];
        } else if (filter.showOptionIcons) {
          chip.vehicleTypes = selected.filter(isVehicleType) as VehicleType[];
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

export function buildFilterSummary<T>(
  filter: FilterDef<T>,
  value: unknown,
  translate: TranslateService,
): FilterSummary {
  if (!isActiveFilterValue(filter, value)) {
    return {
      text: filterSummaryPlaceholder(filter, translate),
      isPlaceholder: true,
    };
  }

  switch (filter.type) {
    case 'search':
      return { text: String(value), isPlaceholder: false };

    case 'select':
      return {
        text: optionLabel(filter.options, String(value), translate),
        isPlaceholder: false,
      };

    case 'multiSelect':
    case 'optionTiles': {
      const selected = value as string[];

      if (filter.showStatusBadges) {
        const statuses = selected.filter(isUserEntityStatus) as UserEntityStatus[];
        const maxVisible =
          statuses.length > FILTER_SUMMARY_TEXT_MAX_VISIBLE
            ? FILTER_SUMMARY_TEXT_MAX_VISIBLE
            : FILTER_SUMMARY_MAX_VISIBLE;
        const { visible, overflowCount } = truncateFilterSelection(statuses, maxVisible);
        return {
          text: '',
          isPlaceholder: false,
          statuses: visible,
          overflowCount: overflowCount || undefined,
        };
      }

      if (filter.showOptionIcons) {
        const vehicleTypes = selected.filter(isVehicleType) as VehicleType[];
        const maxVisible =
          vehicleTypes.length > FILTER_SUMMARY_TEXT_MAX_VISIBLE
            ? FILTER_SUMMARY_TEXT_MAX_VISIBLE
            : FILTER_SUMMARY_MAX_VISIBLE;
        const { visible, overflowCount } = truncateFilterSelection(vehicleTypes, maxVisible);
        return {
          text: '',
          isPlaceholder: false,
          vehicleTypes: visible,
          overflowCount: overflowCount || undefined,
        };
      }

      const labels = selected.map((item) => optionLabel(filter.options, item, translate));
      const maxVisible =
        labels.length > FILTER_SUMMARY_TEXT_MAX_VISIBLE
          ? FILTER_SUMMARY_TEXT_MAX_VISIBLE
          : FILTER_SUMMARY_MAX_VISIBLE;
      const { visible, overflowCount } = truncateFilterSelection(labels, maxVisible);
      return {
        text: '',
        isPlaceholder: false,
        labels: visible,
        overflowCount: overflowCount || undefined,
      };
    }

    case 'dateRange': {
      const range = value as DateRangeFilterValue;
      const from = range.from ? formatDisplayDate(range.from) : '…';
      const to = range.to ? formatDisplayDate(range.to) : '…';
      return { text: `${from} – ${to}`, isPlaceholder: false };
    }

    case 'numberRange': {
      const range = value as NumberRangeFilterValue;
      const min = range.min ?? filter.min;
      const max = range.max ?? filter.max;
      const unit = filter.unitSuffixKey ? translate.instant(filter.unitSuffixKey) : '';
      const rangeText = `${formatChipRangeNumber(min, filter.step)} – ${formatChipRangeNumber(max, filter.step)}`;
      return {
        text: unit ? `${rangeText} ${unit}` : rangeText,
        isPlaceholder: false,
      };
    }

    default:
      return { text: '', isPlaceholder: true };
  }
}

function filterSummaryPlaceholder<T>(_filter: FilterDef<T>, translate: TranslateService): string {
  return translate.instant('shared.table.filters.all');
}

export function truncateFilterSelection<T>(
  items: T[],
  maxVisible = FILTER_SUMMARY_MAX_VISIBLE,
): { visible: T[]; overflowCount: number } {
  if (items.length <= maxVisible) {
    return { visible: items, overflowCount: 0 };
  }

  return {
    visible: items.slice(0, maxVisible),
    overflowCount: items.length - maxVisible,
  };
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
    case 'optionTiles':
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
