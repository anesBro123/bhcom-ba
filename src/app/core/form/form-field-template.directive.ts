import { Directive, inject, input, TemplateRef } from '@angular/core';

import type { FormFieldContext } from './form.types';

@Directive({
  selector: '[appFormField]',
})
export class FormFieldTemplateDirective {
  readonly fieldKey = input.required<string>({ alias: 'appFormField' });
  readonly template = inject(TemplateRef<FormFieldContext<unknown>>);
}
