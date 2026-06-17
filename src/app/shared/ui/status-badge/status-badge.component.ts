import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import {
  USER_ENTITY_STATUS_LABEL_KEYS,
  type UserEntityStatus,
} from '../../constants/user-entity-status';

@Component({
  selector: 'app-status-badge',
  imports: [TranslatePipe],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  readonly status = input.required<UserEntityStatus>();

  protected readonly labelKey = computed(() => USER_ENTITY_STATUS_LABEL_KEYS[this.status()]);
}
