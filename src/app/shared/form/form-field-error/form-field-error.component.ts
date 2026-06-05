import { Component, input } from '@angular/core';
import { type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { getControlErrorKey, getControlErrorParams } from '../form-control-error';

@Component({
  selector: 'app-form-field-error',
  imports: [TranslatePipe],
  templateUrl: './form-field-error.component.html',
  styleUrl: './form-field-error.component.scss',
})
export class FormFieldErrorComponent {
  readonly control = input.required<AbstractControl>();
  readonly errorKeys = input<Partial<Record<string, string>>>();

  protected errorKey(): string | null {
    return getControlErrorKey(this.control(), this.errorKeys());
  }

  protected errorParams(): Record<string, unknown> | undefined {
    const key = this.errorKey();
    return key ? getControlErrorParams(this.control(), key) : undefined;
  }
}
