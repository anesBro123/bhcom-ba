import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import { entityContextClass } from '../../constants/entity-context-class';
import type { UserEntityTab } from '../../constants/user-urls';

@Component({
  selector: 'app-quick-action-card',
  imports: [RouterLink, TranslatePipe, NgComponentOutlet, NgClass],
  templateUrl: './quick-action-card.component.html',
  styleUrl: './quick-action-card.component.scss',
})
export class QuickActionCardComponent {
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly route = input.required<string>();
  readonly queryParams = input<Record<string, string>>();
  readonly icon = input.required<LucideIcon>();
  /** Optional service type — colored icon + left spine at rest; stronger hover. */
  readonly entityTab = input<UserEntityTab>();

  protected readonly iconInputs = { size: 22 };
  protected readonly entityHostClass = computed(() => entityContextClass(this.entityTab()));
}
