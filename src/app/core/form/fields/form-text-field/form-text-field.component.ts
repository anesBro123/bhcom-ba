import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCalendar } from '@lucide/angular';

import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-text-field',
  imports: [ReactiveFormsModule, TranslatePipe, LucideCalendar],
  templateUrl: './form-text-field.component.html',
  styleUrl: './form-text-field.component.scss',
})
export class FormTextFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();
  readonly inputType = input<'text' | 'email' | 'tel' | 'number' | 'date'>('text');

  protected isDate(): boolean {
    return this.inputType() === 'date';
  }

  protected showError(): boolean {
    const control = this.control();
    return control.touched && control.invalid;
  }
}
