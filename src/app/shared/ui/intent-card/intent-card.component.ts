import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import type { UserEntityTab } from '../../constants/user-urls';
import { entityContextClass } from '../../constants/entity-context-class';

export interface IntentCardAction {
  labelKey: string;
  route: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-intent-card',
  imports: [RouterLink, TranslatePipe, NgComponentOutlet, NgClass],
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
  /** Optional service type — enables subtle entity accent on hover (mobile: left spine at rest). */
  readonly entityTab = input<UserEntityTab>();

  protected readonly iconInputs = { size: 22 };
  protected readonly entityClass = computed(() => entityContextClass(this.entityTab()));
}
