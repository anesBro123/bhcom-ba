import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-quick-action-card',
  imports: [RouterLink, TranslatePipe, NgComponentOutlet],
  templateUrl: './quick-action-card.component.html',
  styleUrl: './quick-action-card.component.scss',
})
export class QuickActionCardComponent {
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly route = input.required<string>();
  readonly icon = input.required<LucideIcon>();

  protected readonly iconInputs = { size: 22 };
}
