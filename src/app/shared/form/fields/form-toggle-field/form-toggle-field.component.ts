import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-toggle-field',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-toggle-field.component.html',
  styleUrl: './form-toggle-field.component.scss',
})
export class FormToggleFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();
}
