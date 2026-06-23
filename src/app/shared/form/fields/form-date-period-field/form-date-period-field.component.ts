import { Component, computed, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { DatePeriodPickerComponent } from '../../../ui/date-period-picker/date-period-picker.component';
import { resolveFieldDateBound, type DatePeriodValue } from '../../../utils/date-input';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-date-period-field',
  imports: [TranslatePipe, DatePeriodPickerComponent, FormFieldErrorComponent],
  templateUrl: './form-date-period-field.component.html',
  styleUrl: './form-date-period-field.component.scss',
})
export class FormDatePeriodFieldComponent<T extends object> {
  readonly formGroup = input.required<FormGroup>();
  readonly field = input.required<FieldDef<T>>();
  readonly formValue = input.required<Partial<T>>();

  protected readonly isSingle = computed(() => this.field().periodMode === 'single');

  protected readonly periodValue = computed((): DatePeriodValue => {
    const field = this.field();
    const start = String(this.formGroup().get(field.key)?.value ?? '').trim();

    if (this.isSingle()) {
      return start ? { from: start } : {};
    }

    const endKey = field.endKey;
    const end = endKey ? String(this.formGroup().get(endKey)?.value ?? '').trim() : '';
    const value: DatePeriodValue = {};
    if (start) {
      value.from = start;
    }
    if (end) {
      value.to = end;
    }
    return value;
  });

  protected readonly errorControl = computed(() => {
    const field = this.field();
    const endKey = field.endKey;
    const endControl = endKey ? this.formGroup().get(endKey) : null;
    if (endControl && (endControl.touched || endControl.dirty) && endControl.invalid) {
      return endControl;
    }

    return this.formGroup().get(field.key);
  });

  protected resolvedMinDate(): string | null {
    return resolveFieldDateBound(this.field().minDate, this.formValue());
  }

  protected onValueChange(next: DatePeriodValue): void {
    const field = this.field();
    const startControl = this.formGroup().get(field.key);
    if (!startControl) {
      return;
    }

    startControl.setValue((next.from ?? '') as never);
    startControl.markAsDirty();
    startControl.markAsTouched();
    startControl.updateValueAndValidity({ emitEvent: true });

    if (this.isSingle()) {
      return;
    }

    const endKey = field.endKey;
    if (!endKey) {
      return;
    }

    const endControl = this.formGroup().get(endKey);
    if (!endControl) {
      return;
    }

    endControl.setValue((next.to ?? '') as never);
    endControl.markAsDirty();
    endControl.markAsTouched();
    endControl.updateValueAndValidity({ emitEvent: true });
  }
}
