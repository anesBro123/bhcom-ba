import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef, RadioOption } from '../../form.types';

@Component({
  selector: 'app-form-radio-field',
  imports: [ReactiveFormsModule, TranslatePipe, FormFieldErrorComponent],
  templateUrl: './form-radio-field.component.html',
  styleUrl: './form-radio-field.component.scss',
})
export class FormRadioFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();

  protected options(): RadioOption[] {
    return (this.field().options ?? []) as RadioOption[];
  }
}
