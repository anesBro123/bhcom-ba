import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import type { FieldDef, RadioOption } from '../../form.types';

@Component({
  selector: 'app-form-radio-field',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-radio-field.component.html',
  styleUrl: './form-radio-field.component.scss',
})
export class FormRadioFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();

  protected options(): RadioOption[] {
    return (this.field().options ?? []) as RadioOption[];
  }

  protected showError(): boolean {
    const control = this.control();
    return control.touched && control.invalid;
  }
}
