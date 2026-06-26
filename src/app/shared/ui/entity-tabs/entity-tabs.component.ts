import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import { entityContextClass } from '../../constants/entity-context-class';
import type { EntityContextTab } from '../../constants/entity-context-class';

export interface EntityTabConfig<T extends string = string> {
  id: T;
  labelKey: string;
  icon: LucideIcon;
}

@Component({
  selector: 'app-entity-tabs',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './entity-tabs.component.html',
  styleUrl: './entity-tabs.component.scss',
})
export class EntityTabsComponent<T extends string = string> {
  readonly activeTab = input.required<T>();
  readonly tabs = input.required<EntityTabConfig<T>[]>();
  readonly accentMode = input<'entity' | 'neutral'>('entity');
  readonly ariaLabelKey = input('portal.user.features.entityTabs.ariaLabel');

  readonly tabChange = output<T>();

  protected readonly iconInputs = { size: 18 };

  protected selectTab(tab: T): void {
    if (tab !== this.activeTab()) {
      this.tabChange.emit(tab);
    }
  }

  protected tabClassList(tab: T): string {
    const classes = ['entity-tabs__tab'];
    if (this.activeTab() === tab) {
      classes.push('entity-tabs__tab--active');
      if (this.accentMode() === 'entity') {
        classes.push(entityContextClass(tab as EntityContextTab));
      }
    }
    return classes.join(' ');
  }
}
