export function formatDetailDateValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
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
