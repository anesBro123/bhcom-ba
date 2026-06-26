import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ADMIN_CREATE_USER_URL,
  ADMIN_CREATE_VEHICLE_URL,
  ADMIN_CREATE_WAREHOUSE_URL,
  adminHomeUrl,
  parseAdminEntityTab,
  type AdminEntityTab,
} from '../../../../shared/constants/app-urls';
import { syncHubEntityTab } from '../../../../shared/utils/hub-tab-sync';
import { EntityTabsComponent } from '../../../../shared/ui/entity-tabs/entity-tabs.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { PrimaryActionLinkComponent } from '../../../../shared/ui/primary-action-link/primary-action-link.component';
import { adminCreateLabelKey } from '../../admin-create-options.config';
import { ADMIN_ENTITY_TAB_CONFIG } from '../../admin-entity-tabs.config';
import { AdminPageIcons } from '../../admin-page-icons';
import { UserTablePageComponent } from '../users/table/user-table-page.component';
import { VehicleTablePageComponent } from '../vehicles/table/vehicle-table-page.component';
import { WarehouseTablePageComponent } from '../warehouses/table/warehouse-table-page.component';

@Component({
  selector: 'app-admin-home-page',
  imports: [
    PageHeaderComponent,
    PageTitleComponent,
    PrimaryActionLinkComponent,
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

  protected readonly createUrl = computed(() => {
    switch (this.activeTab()) {
      case 'vehicles':
        return ADMIN_CREATE_VEHICLE_URL;
      case 'warehouses':
        return ADMIN_CREATE_WAREHOUSE_URL;
      default:
        return ADMIN_CREATE_USER_URL;
    }
  });

  protected readonly createLabelKey = computed(() => adminCreateLabelKey(this.activeTab()));

  constructor() {
    syncHubEntityTab(this.route, this.destroyRef, parseAdminEntityTab, this.activeTab);
  }

  protected onTabChange(tab: AdminEntityTab): void {
    void this.router.navigateByUrl(adminHomeUrl(tab));
  }
}
