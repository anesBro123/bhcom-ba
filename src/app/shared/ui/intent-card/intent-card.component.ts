import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

export interface IntentCardAction {
  labelKey: string;
  route: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-intent-card',
  imports: [RouterLink, TranslatePipe, NgComponentOutlet],
  templateUrl: './intent-card.component.html',
  styleUrl: './intent-card.component.scss',
})
export class IntentCardComponent {
  readonly icon = input.required<LucideIcon>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly actions = input.required<IntentCardAction[]>();
  /** Whole-card link with hover border — use when there is a single action (Offer picker). */
  readonly clickableCard = input(false);

  protected readonly iconInputs = { size: 22 };
}
