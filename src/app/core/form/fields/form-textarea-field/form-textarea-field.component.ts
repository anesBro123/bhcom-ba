import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import type { FieldDef } from '../../form.types';

@Component({
  selector: 'app-form-textarea-field',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-textarea-field.component.html',
  styleUrl: './form-textarea-field.component.scss',
})
export class FormTextareaFieldComponent<T extends object> {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();

  protected showError(): boolean {
    const control = this.control();
    return control.touched && control.invalid;
  }
}
