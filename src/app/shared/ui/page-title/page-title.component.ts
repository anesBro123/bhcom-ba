import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import { entityContextClass } from '../../constants/entity-context-class';
import type { UserEntityTab } from '../../constants/user-urls';

@Component({
  selector: 'app-page-title',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
  host: {
    '[class]': 'entityHostClass()',
  },
})
export class PageTitleComponent {
  readonly titleKey = input.required<string>();
  readonly subtitleKey = input<string>();
  readonly subtitleParams = input<Record<string, string>>();
  readonly icon = input.required<LucideIcon>();
  /** Optional service type — tints the decorative entity icon. */
  readonly entityTab = input<UserEntityTab>();

  protected readonly iconInputs = { size: 20 };
  protected readonly entityHostClass = computed(() => entityContextClass(this.entityTab()));
}
