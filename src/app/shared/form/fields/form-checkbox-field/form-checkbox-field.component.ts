import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-checkbox-field',
  imports: [ReactiveFormsModule, TranslatePipe, FormFieldErrorComponent],
  templateUrl: './form-checkbox-field.component.html',
  styleUrl: './form-checkbox-field.component.scss',
})
export class FormCheckboxFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();
}
