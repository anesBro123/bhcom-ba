import type { FormGroup } from '@angular/forms';

import type {
  FieldDef,
  FormSectionDef,
  FormStepDef,
  StepperMode,
  ValidationState,
} from './form.types';

export function buildFieldTemplateKey(stepId: string, sectionId: string, fieldKey: string): string {
  return `${stepId}:${sectionId}:${fieldKey}`;
}

export function collectStepFieldKeys<T extends object>(step: FormStepDef<T>): string[] {
  const keys: string[] = [];

  for (const section of step.sections ?? []) {
    if (section.kind === 'template') {
      continue;
    }

    for (const field of section.fields ?? []) {
      if (field.type !== 'custom') {
        keys.push(field.key);
      }
    }
  }

  return keys;
}

export function getVisibleFields<T extends object>(
  fields: readonly FieldDef<T>[] | undefined,
  value: Partial<T>,
): FieldDef<T>[] {
  return [...(fields ?? [])].filter((field) => !(field.hidden?.(value) ?? false));
}

export type StepValidationOptions = {
  markTouched?: boolean;
};

export function validateStepControls<T extends object>(
  form: FormGroup,
  step: FormStepDef<T>,
  value: Partial<T>,
  options: { markTouched?: boolean } = {},
): boolean {
  const markTouched = options.markTouched ?? true;

  if (step.validate) {
    return step.validate(form);
  }

  let valid = true;

  for (const section of step.sections ?? []) {
    if (section.kind === 'template') {
      continue;
    }

    for (const field of getVisibleFields(section.fields, value)) {
      if (field.type === 'custom') {
        continue;
      }

      const control = form.get(field.key);
      if (!control) {
        continue;
      }

      if (markTouched) {
        control.markAsTouched();
      }

      if (field.disabled?.(value)) {
        continue;
      }

      if (control.invalid) {
        valid = false;
      }
    }
  }

  return valid;
}

export function runStepValidation<T extends object>(
  form: FormGroup,
  step: FormStepDef<T>,
  value: Partial<T>,
  options: StepValidationOptions = {},
): boolean {
  return validateStepControls(form, step, value, {
    markTouched: options.markTouched ?? false,
  });
}

export function isStepValid<T extends object>(
  form: FormGroup,
  step: FormStepDef<T>,
  value: Partial<T>,
): boolean {
  return runStepValidation(form, step, value, { markTouched: false });
}

export function resolveStepValidationState<T extends object>(
  form: FormGroup,
  step: FormStepDef<T>,
  index: number,
  currentIndex: number,
  value: Partial<T>,
  options: {
    mode: StepperMode;
    engagedSteps: ReadonlySet<number>;
    stepOutcomes: ReadonlyMap<number, 'valid' | 'invalid'>;
    editValidated: boolean;
  },
): ValidationState {
  const { mode, engagedSteps, stepOutcomes, editValidated } = options;
  const valid = isStepValid(form, step, value);

  if (mode === 'edit' && editValidated) {
    return valid ? 'valid' : 'invalid';
  }

  if (!engagedSteps.has(index)) {
    return 'notStarted';
  }

  if (index === currentIndex) {
    if (valid) {
      return 'valid';
    }

    if (stepOutcomes.get(index) === 'invalid') {
      return 'invalid';
    }

    return 'inProgress';
  }

  return stepOutcomes.get(index) ?? 'notStarted';
}

export function applyFieldDisabledState<T extends object>(
  form: FormGroup,
  sections: readonly FormSectionDef<T>[] | undefined,
  value: Partial<T>,
): void {
  for (const section of sections ?? []) {
    for (const field of section.fields ?? []) {
      const control = form.get(field.key);
      if (!control) {
        continue;
      }

      const disabled = field.disabled?.(value) ?? false;
      if (disabled && control.enabled) {
        control.disable({ emitEvent: false });
      } else if (!disabled && control.disabled) {
        control.enable({ emitEvent: false });
      }
    }
  }
}
