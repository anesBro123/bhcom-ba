import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import type { DateInputBoundValue } from '../form/form.types';

export interface DatePeriodValue {
  from?: string;
  to?: string;
}

export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function resolveDateInputBound(value: DateInputBoundValue | undefined): string | null {
  if (!value) {
    return null;
  }

  return value === 'today' ? todayIsoDate() : value;
}

export function resolveFieldDateBound<T extends object>(
  bound: ((value: Partial<T>) => DateInputBoundValue | undefined) | DateInputBoundValue | undefined,
  formValue: Partial<T>,
): string | null {
  if (!bound) {
    return null;
  }

  const resolved = typeof bound === 'function' ? bound(formValue) : bound;
  return resolveDateInputBound(resolved);
}

export function notPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    return value < todayIsoDate() ? { minDate: true } : null;
  };
}

export function endDateOnOrAfterStartValidator(startKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    if (value < todayIsoDate()) {
      return { minDate: true };
    }

    const start = control.parent?.get(startKey)?.value as string | null;

    if (start && value < start) {
      return { dateRange: true };
    }

    return null;
  };
}

export function isoDateFromLocal(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export interface CalendarCell {
  iso: string;
  day: number;
  inMonth: boolean;
}

export function buildCalendarMonth(year: number, month: number): CalendarCell[][] {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells: CalendarCell[] = [];

  const prevMonthDays = new Date(year, month - 1, 0).getDate();
  for (let index = startOffset - 1; index >= 0; index -= 1) {
    const day = prevMonthDays - index;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    cells.push({
      iso: isoDateFromLocal(prevYear, prevMonth, day),
      day,
      inMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      iso: isoDateFromLocal(year, month, day),
      day,
      inMonth: true,
    });
  }

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  let trailingDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({
      iso: isoDateFromLocal(nextYear, nextMonth, trailingDay),
      day: trailingDay,
      inMonth: false,
    });
    trailingDay += 1;
  }

  const weeks: CalendarCell[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

export function isDatePeriodDisabled(
  iso: string,
  context: {
    minDate?: string | null;
    from?: string;
    pickingEnd: boolean;
    mode: 'range' | 'single';
  },
): boolean {
  if (context.minDate && iso < context.minDate) {
    return true;
  }

  if (context.mode === 'range' && context.pickingEnd && context.from && iso < context.from) {
    return true;
  }

  return false;
}

export function sanitizeDatePeriodValue(
  value: DatePeriodValue,
  options?: { minDate?: string | null; allowPartial?: boolean },
): DatePeriodValue {
  const cleaned: DatePeriodValue = {};
  const minDate = options?.minDate ?? null;

  if (value.from?.trim()) {
    const from = value.from.trim();
    if (!minDate || from >= minDate) {
      cleaned.from = from;
    }
  }

  if (value.to?.trim()) {
    const to = value.to.trim();
    if (!minDate || to >= minDate) {
      cleaned.to = to;
    }
  }

  if (cleaned.from && cleaned.to && cleaned.to < cleaned.from) {
    cleaned.to = cleaned.from;
  }

  const hasValue = Boolean(cleaned.from || cleaned.to);
  if (!hasValue) {
    return {};
  }

  if (!options?.allowPartial && cleaned.from && !cleaned.to) {
    return { from: cleaned.from };
  }

  return cleaned;
}

export function initialCalendarMonth(value: DatePeriodValue, minDate?: string | null): {
  year: number;
  month: number;
} {
  const candidate = value.from ?? value.to ?? minDate ?? todayIsoDate();
  const parts = /^(\d{4})-(\d{2})-\d{2}$/.exec(candidate);
  if (!parts) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }

  return { year: Number(parts[1]), month: Number(parts[2]) };
}
