import { formatDisplayDate } from '../utils/format-display-date';

export function formatDetailDateValue(value: unknown): string {
  return formatDisplayDate(value);
}

export function formatDetailNumberValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const numeric = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(numeric)) {
    return String(value);
  }

  return new Intl.NumberFormat('en-US').format(numeric);
}

export function formatDetailTextValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  return String(value);
}
