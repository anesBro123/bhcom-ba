import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  adminHomeUrl,
  parseAdminEntityTab,
  type AdminEntityTab,
} from '../../../../shared/constants/app-urls';
import { syncHubEntityTab } from '../../../../shared/utils/hub-tab-sync';
import { EntityTabsComponent } from '../../../../shared/ui/entity-tabs/entity-tabs.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { ADMIN_ENTITY_TAB_CONFIG } from '../../admin-entity-tabs.config';
import { AdminPageIcons } from '../../admin-page-icons';
import { UserTablePageComponent } from '../users/table/user-table-page.component';
import { VehicleTablePageComponent } from '../vehicles/table/vehicle-table-page.component';
import { WarehouseTablePageComponent } from '../warehouses/table/warehouse-table-page.component';

@Component({
  selector: 'app-admin-home-page',
  imports: [
    PageTitleComponent,
    EntityTabsComponent,
    UserTablePageComponent,
    VehicleTablePageComponent,
    WarehouseTablePageComponent,
  ],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.scss',
})
export class AdminHomePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageIcon = AdminPageIcons.home;
  protected readonly entityTabs = ADMIN_ENTITY_TAB_CONFIG;
  protected readonly activeTab = signal<AdminEntityTab>('users');

  constructor() {
    syncHubEntityTab(this.route, this.destroyRef, parseAdminEntityTab, this.activeTab);
  }

  protected onTabChange(tab: AdminEntityTab): void {
    void this.router.navigateByUrl(adminHomeUrl(tab));
  }
}
