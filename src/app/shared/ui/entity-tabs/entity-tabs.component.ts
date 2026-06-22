import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { LucideIcon } from '@lucide/angular';

import { entityContextClass } from '../../constants/entity-context-class';
import type { UserEntityTab } from '../../constants/user-urls';

export interface EntityTabConfig {
  id: UserEntityTab;
  labelKey: string;
  icon: LucideIcon;
}

@Component({
  selector: 'app-entity-tabs',
  imports: [TranslatePipe, NgComponentOutlet],
  templateUrl: './entity-tabs.component.html',
  styleUrl: './entity-tabs.component.scss',
})
export class EntityTabsComponent {
  readonly activeTab = input.required<UserEntityTab>();
  readonly tabs = input.required<EntityTabConfig[]>();

  readonly tabChange = output<UserEntityTab>();

  protected readonly iconInputs = { size: 18 };

  protected selectTab(tab: UserEntityTab): void {
    if (tab !== this.activeTab()) {
      this.tabChange.emit(tab);
    }
  }

  protected tabClassList(tab: UserEntityTab): string {
    const classes = ['entity-tabs__tab'];
    if (this.activeTab() === tab) {
      classes.push('entity-tabs__tab--active', entityContextClass(tab));
    }
    return classes.join(' ');
  }
}
