import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCalendar } from '@lucide/angular';

import { resolveFieldDateBound } from '../../../utils/date-input';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-text-field',
  imports: [ReactiveFormsModule, TranslatePipe, LucideCalendar, FormFieldErrorComponent],
  templateUrl: './form-text-field.component.html',
  styleUrl: './form-text-field.component.scss',
})
export class FormTextFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();
  readonly formValue = input.required<Partial<T>>();
  readonly inputType = input<'text' | 'email' | 'tel' | 'number' | 'date' | 'password'>('text');

  protected isDate(): boolean {
    return this.inputType() === 'date';
  }

  protected resolvedMinDate(): string | null {
    return resolveFieldDateBound(this.field().minDate, this.formValue());
  }

  protected resolvedMaxDate(): string | null {
    return resolveFieldDateBound(this.field().maxDate, this.formValue());
  }
}
