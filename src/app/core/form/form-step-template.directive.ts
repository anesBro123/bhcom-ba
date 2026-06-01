import { Directive, inject, input, TemplateRef } from '@angular/core';

import type { FormStepContext } from './form.types';

@Directive({
  selector: '[appFormStep]',
})
export class FormStepTemplateDirective {
  readonly stepKey = input.required<string>({ alias: 'appFormStep' });
  readonly template = inject(TemplateRef<FormStepContext<unknown>>);
}
