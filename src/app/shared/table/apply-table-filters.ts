import { normalizeForSearch } from '../utils/normalize-for-search';

import { isNarrowedNumberRange } from './number-range-filter.utils';
import type {
  DateRangeFilterValue,
  FilterDef,
  NumberRangeFilterValue,
  TableQuery,
} from './table.types';

export function applyTableFilters<T extends object>(
  items: T[],
  query: TableQuery,
  filters: FilterDef<T>[] | undefined,
): T[] {
  let result = items;

  for (const [key, value] of Object.entries(query.filters)) {
    const filterDef = filters?.find((filter) => filter.key === key);
    if (!isActiveFilterValueForDef(filterDef, value)) {
      continue;
    }

    result = result.filter((item) => matchesFilter(item, filterDef, key, value));
  }

  return result;
}

function matchesFilter<T extends object>(
  item: T,
  filterDef: FilterDef<T> | undefined,
  key: string,
  value: unknown,
): boolean {
  const record = item as Record<string, unknown>;

  if (filterDef?.type === 'search') {
    const fields = filterDef.searchFields ?? [filterDef.key];
    const needle = normalizeForSearch(String(value));
    return fields.some((field) => {
      const fieldValue = record[field];
      return fieldValue !== null && fieldValue !== undefined
        ? normalizeForSearch(String(fieldValue)).includes(needle)
        : false;
    });
  }

  if (filterDef?.type === 'select') {
    const field = filterDef.field ?? filterDef.key;
    return String(record[field]) === String(value);
  }

  if (filterDef?.type === 'multiSelect' || filterDef?.type === 'optionTiles') {
    const selected = value as string[];
    if (!Array.isArray(selected) || selected.length === 0) {
      return true;
    }

    const field = filterDef.field ?? filterDef.key;
    return selected.includes(String(record[field]));
  }

  if (filterDef?.type === 'dateRange') {
    return matchesDateRange(record, filterDef.field, filterDef.endField, value as DateRangeFilterValue);
  }

  if (filterDef?.type === 'numberRange') {
    const field = filterDef.field ?? filterDef.key;
    return matchesNumberRange(record, field, value as NumberRangeFilterValue);
  }

  return String(record[key]) === String(value);
}

function matchesDateRange(
  record: Record<string, unknown>,
  field: string,
  endField: string | undefined,
  value: DateRangeFilterValue,
): boolean {
  const from = value.from?.trim();
  const to = value.to?.trim();

  if (!from && !to) {
    return true;
  }

  if (endField) {
    const recordStart = String(record[field] ?? '');
    const recordEnd = String(record[endField] ?? '');

    if (!recordStart || !recordEnd) {
      return false;
    }

    if (from && recordEnd < from) {
      return false;
    }

    if (to && recordStart > to) {
      return false;
    }

    return true;
  }

  const recordDate = String(record[field] ?? '');
  if (!recordDate) {
    return false;
  }

  if (from && recordDate < from) {
    return false;
  }

  if (to && recordDate > to) {
    return false;
  }

  return true;
}

function matchesNumberRange(
  record: Record<string, unknown>,
  field: string,
  value: NumberRangeFilterValue,
): boolean {
  const raw = record[field];
  if (raw === null || raw === undefined || raw === '') {
    return false;
  }

  const numeric = Number(raw);
  if (Number.isNaN(numeric)) {
    return false;
  }

  if (value.min !== undefined && value.min !== null && numeric < value.min) {
    return false;
  }

  if (value.max !== undefined && value.max !== null && numeric > value.max) {
    return false;
  }

  return true;
}

export function isActiveFilterValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    const dateRange = value as DateRangeFilterValue;
    if ('from' in value || 'to' in value) {
      return Boolean(dateRange.from?.trim() || dateRange.to?.trim());
    }

    const numberRange = value as NumberRangeFilterValue;
    if ('min' in value || 'max' in value) {
      return numberRange.min !== undefined || numberRange.max !== undefined;
    }
  }

  return true;
}

export function isActiveFilterValueForDef<T>(
  filterDef: FilterDef<T> | undefined,
  value: unknown,
): boolean {
  if (filterDef?.type === 'numberRange') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }

    return isNarrowedNumberRange(value as NumberRangeFilterValue, filterDef.min, filterDef.max);
  }

  return isActiveFilterValue(value);
}

export function countActiveFilters<T = unknown>(
  filters: Record<string, unknown>,
  filterDefs?: FilterDef<T>[],
): number {
  return Object.entries(filters).filter(([key, value]) => {
    const filterDef = filterDefs?.find((filter) => filter.key === key);
    return isActiveFilterValueForDef(filterDef, value);
  }).length;
}
