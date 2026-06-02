import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import type { FormActionsDef } from '../form.types';

@Component({
  selector: 'app-form-footer',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss',
})
export class FormFooterComponent {
  readonly actions = input.required<FormActionsDef>();
  readonly isFirstStep = input(true);
  readonly isLastStep = input(false);
  readonly showPrevious = input(true);
  readonly inCard = input(false);
  readonly submitDisabled = input(false);

  previous = output<void>();
  next = output<void>();
  submit = output<void>();

  protected submitIcon(): LucideIcon | undefined {
    return this.actions().submit?.icon;
  }

  protected readonly iconInputs = { size: 16 };
}
