import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronDown } from '@lucide/angular';

import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef, SelectOption } from '../../form.types';

@Component({
  selector: 'app-form-select-field',
  imports: [ReactiveFormsModule, TranslatePipe, LucideChevronDown, FormFieldErrorComponent],
  templateUrl: './form-select-field.component.html',
  styleUrl: './form-select-field.component.scss',
})
export class FormSelectFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();

  protected options(): SelectOption[] {
    return (this.field().options ?? []) as SelectOption[];
  }
}
