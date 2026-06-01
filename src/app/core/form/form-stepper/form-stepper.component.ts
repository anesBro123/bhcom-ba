import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import type { FormStepDef } from '../form.types';

@Component({
  selector: 'app-form-stepper',
  imports: [TranslatePipe],
  templateUrl: './form-stepper.component.html',
  styleUrl: './form-stepper.component.scss',
})
export class FormStepperComponent<T extends object> {
  readonly steps = input.required<readonly FormStepDef<T>[]>();
  readonly stepIndex = input.required<number>();
  readonly progressPercent = input.required<number>();
}
