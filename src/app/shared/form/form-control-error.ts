import type { AbstractControl } from '@angular/forms';

export const DEFAULT_ERROR_PRIORITY = [
  'required',
  'email',
  'minlength',
  'maxlength',
  'min',
  'max',
  'pattern',
  'passwordMismatch',
] as const;

export const DEFAULT_ERROR_KEYS: Record<string, string> = {
  required: 'forms.common.errors.required',
  email: 'forms.common.errors.email',
  minlength: 'forms.common.errors.minLength',
  maxlength: 'forms.common.errors.maxLength',
  min: 'forms.common.errors.min',
  max: 'forms.common.errors.max',
  pattern: 'forms.common.errors.pattern',
  passwordMismatch: 'forms.common.errors.passwordMismatch',
};

const FALLBACK_ERROR_KEY = 'forms.common.errors.invalid';

export function getControlErrorKey(
  control: AbstractControl,
  fieldErrorKeys?: Partial<Record<string, string>>,
): string | null {
  if (!control.touched || !control.errors) {
    return null;
  }

  const errors = control.errors;
  const keys = { ...DEFAULT_ERROR_KEYS, ...fieldErrorKeys };

  for (const errorName of DEFAULT_ERROR_PRIORITY) {
    if (errors[errorName] != null && keys[errorName]) {
      return keys[errorName];
    }
  }

  for (const errorName of Object.keys(errors)) {
    if (fieldErrorKeys?.[errorName]) {
      return fieldErrorKeys[errorName];
    }
  }

  return FALLBACK_ERROR_KEY;
}

export function getControlErrorParams(
  control: AbstractControl,
  errorKey: string,
): Record<string, unknown> | undefined {
  const errors = control.errors;
  if (!errors) {
    return undefined;
  }

  if (errorKey === DEFAULT_ERROR_KEYS['minlength'] && errors['minlength']) {
    return { min: errors['minlength'].requiredLength };
  }

  if (errorKey === DEFAULT_ERROR_KEYS['maxlength'] && errors['maxlength']) {
    return { max: errors['maxlength'].requiredLength };
  }

  if (errorKey === DEFAULT_ERROR_KEYS['min'] && errors['min']) {
    return { min: errors['min'].min };
  }

  if (errorKey === DEFAULT_ERROR_KEYS['max'] && errors['max']) {
    return { max: errors['max'].max };
  }

  return undefined;
}
