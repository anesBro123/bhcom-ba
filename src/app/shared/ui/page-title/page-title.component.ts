import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-page-title',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  readonly titleKey = input.required<string>();
  readonly subtitleKey = input<string>();
  readonly icon = input.required<LucideIcon>();

  protected readonly iconInputs = { size: 20 };
}
