import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import type { DateInputBoundValue } from '../form/form.types';

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
