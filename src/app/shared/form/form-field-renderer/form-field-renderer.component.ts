import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { FormGroup, type AbstractControl } from '@angular/forms';

import { FormCheckboxFieldComponent } from '../fields/form-checkbox-field/form-checkbox-field.component';
import { FormAutocompleteFieldComponent } from '../fields/form-autocomplete-field/form-autocomplete-field.component';
import { FormRadioFieldComponent } from '../fields/form-radio-field/form-radio-field.component';
import { FormSelectFieldComponent } from '../fields/form-select-field/form-select-field.component';
import { FormTextFieldComponent } from '../fields/form-text-field/form-text-field.component';
import { FormTextareaFieldComponent } from '../fields/form-textarea-field/form-textarea-field.component';
import { FormToggleFieldComponent } from '../fields/form-toggle-field/form-toggle-field.component';
import { gridColumnSpan } from '../form-grid/form-grid.component';
import type { FieldDef, FormFieldContext } from '../form.types';

@Component({
  selector: 'app-form-field-renderer',
  imports: [
    NgTemplateOutlet,
    FormTextFieldComponent,
    FormAutocompleteFieldComponent,
    FormSelectFieldComponent,
    FormTextareaFieldComponent,
    FormRadioFieldComponent,
    FormToggleFieldComponent,
    FormCheckboxFieldComponent,
  ],
  templateUrl: './form-field-renderer.component.html',
  styleUrl: './form-field-renderer.component.scss',
})
export class FormFieldRendererComponent<T extends object> {
  readonly formGroup = input.required<FormGroup>();
  readonly field = input.required<FieldDef<T>>();
  readonly stepId = input.required<string>();
  readonly sectionId = input.required<string>();
  readonly formValue = input.required<Partial<T>>();
  readonly customTemplate = input<TemplateRef<FormFieldContext<T>> | null>(null);

  protected control(): AbstractControl | null {
    return this.formGroup().get(this.field().key);
  }

  protected columnSpan(): string {
    return gridColumnSpan(this.field().colSpan ?? 2);
  }

  protected fieldContext(): FormFieldContext<T> {
    const control = this.control();
    return {
      $implicit: this.formValue(),
      control: control!,
      field: this.field(),
      stepId: this.stepId(),
      sectionId: this.sectionId(),
    };
  }

  protected textInputType(): 'text' | 'email' | 'tel' | 'number' | 'date' | 'password' {
    const type = this.field().type;
    if (
      type === 'email' ||
      type === 'tel' ||
      type === 'number' ||
      type === 'date' ||
      type === 'password'
    ) {
      return type;
    }
    return 'text';
  }
}
