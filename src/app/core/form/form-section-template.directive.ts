import { Directive, inject, input, TemplateRef } from '@angular/core';

import type { FormSectionContext } from './form.types';

@Directive({
  selector: '[appFormSection]',
})
export class FormSectionTemplateDirective {
  readonly sectionKey = input.required<string>({ alias: 'appFormSection' });
  readonly template = inject(TemplateRef<FormSectionContext<unknown>>);
}
