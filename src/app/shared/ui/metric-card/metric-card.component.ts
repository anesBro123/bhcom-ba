import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

export type MetricCardVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-metric-card',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent {
  readonly titleKey = input.required<string>();
  readonly value = input.required<string | number>();
  readonly subtitleKey = input<string>();
  readonly icon = input.required<LucideIcon>();
  readonly variant = input<MetricCardVariant>('default');

  protected readonly iconInputs = { size: 20 };
}
