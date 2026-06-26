import { Component, computed, input } from '@angular/core';

import {
  entityContextClass,
  type EntityContextTab,
} from '../../constants/entity-context-class';

@Component({
  selector: 'app-detail-page-layout',
  templateUrl: './detail-page-layout.component.html',
  styleUrl: './detail-page-layout.component.scss',
  host: {
    '[class]': 'entityHostClass()',
  },
})
export class DetailPageLayoutComponent {
  /** Optional service type — entity left spine on detail cards. */
  readonly entityTab = input<EntityContextTab>();

  protected readonly entityHostClass = computed(() => entityContextClass(this.entityTab()));
}
