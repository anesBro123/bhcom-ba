import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideTruck, LucideUsers, LucideWarehouse } from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import {
  ADMIN_USERS_URL,
  ADMIN_VEHICLES_URL,
  ADMIN_WAREHOUSES_URL,
} from '../../../../shared/constants/app-urls';
import { MetricCardComponent, type MetricCardVariant } from '../../../../shared/ui/metric-card/metric-card.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { QuickActionCardComponent } from '../../../../shared/ui/quick-action-card/quick-action-card.component';
import { ADMIN_DASHBOARD_ENTITY_ACTION_GROUPS, ADMIN_DASHBOARD_SETTINGS_ACTION } from './admin-dashboard.actions.config';
import { AdminDashboardService } from './data/admin-dashboard.service';

interface DashboardMetric {
  titleKey: string;
  subtitleKey: string;
  route: string;
  icon: LucideIcon;
  variant: MetricCardVariant;
  countKey: 'users' | 'vehicles' | 'warehouses';
}

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterLink, TranslatePipe, MetricCardComponent, QuickActionCardComponent, PageTitleComponent],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss',
})
export class AdminDashboardPageComponent implements OnInit {
  private readonly dashboardService = inject(AdminDashboardService);

  protected readonly entityActionGroups = ADMIN_DASHBOARD_ENTITY_ACTION_GROUPS;
  protected readonly settingsAction = ADMIN_DASHBOARD_SETTINGS_ACTION;

  protected readonly metrics: DashboardMetric[] = [
    {
      titleKey: 'portal.admin.features.dashboard.metrics.users.title',
      subtitleKey: 'portal.admin.features.dashboard.metrics.users.subtitle',
      route: ADMIN_USERS_URL,
      icon: LucideUsers,
      variant: 'default',
      countKey: 'users',
    },
    {
      titleKey: 'portal.admin.features.dashboard.metrics.vehicles.title',
      subtitleKey: 'portal.admin.features.dashboard.metrics.vehicles.subtitle',
      route: ADMIN_VEHICLES_URL,
      icon: LucideTruck,
      variant: 'default',
      countKey: 'vehicles',
    },
    {
      titleKey: 'portal.admin.features.dashboard.metrics.warehouses.title',
      subtitleKey: 'portal.admin.features.dashboard.metrics.warehouses.subtitle',
      route: ADMIN_WAREHOUSES_URL,
      icon: LucideWarehouse,
      variant: 'default',
      countKey: 'warehouses',
    },
  ];

  protected readonly counts = signal<{ users: number; vehicles: number; warehouses: number } | null>(null);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.dashboardService.getCounts().subscribe({
      next: (counts) => {
        this.counts.set(counts);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  protected metricValue(countKey: DashboardMetric['countKey']): string | number {
    if (this.loading()) {
      return '—';
    }

    return this.counts()?.[countKey] ?? '—';
  }
}
