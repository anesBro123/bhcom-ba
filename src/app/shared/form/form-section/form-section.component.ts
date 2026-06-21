import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-form-section',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss',
})
export class FormSectionComponent {
  readonly titleKey = input<string>();
  readonly subtitleKey = input<string>();
  readonly icon = input<LucideIcon>();
  readonly showFooter = input(false);
  readonly flat = input(false);

  protected readonly iconInputs = { size: 20 };

  protected hasHeader(): boolean {
    return !!(this.titleKey() || this.subtitleKey() || this.icon());
  }
}
