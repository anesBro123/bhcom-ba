import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideMap, LucidePackage, LucideWarehouse } from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import {
  USER_CARGO_URL,
  USER_ROUTES_URL,
  USER_STORAGE_URL,
} from '../../../../shared/constants/app-urls';
import { MetricCardComponent, type MetricCardVariant } from '../../../../shared/ui/metric-card/metric-card.component';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';
import { QuickActionCardComponent } from '../../../../shared/ui/quick-action-card/quick-action-card.component';
import { USER_DASHBOARD_ENTITY_ACTION_GROUPS } from './user-dashboard.actions.config';
import { UserDashboardService } from './data/user-dashboard.service';

interface DashboardMetric {
  titleKey: string;
  subtitleKey: string;
  route: string;
  icon: LucideIcon;
  variant: MetricCardVariant;
  countKey: 'routes' | 'cargo' | 'storage';
}

@Component({
  selector: 'app-user-dashboard-page',
  imports: [RouterLink, TranslatePipe, MetricCardComponent, QuickActionCardComponent, PageTitleComponent],
  templateUrl: './user-dashboard-page.component.html',
  styleUrl: './user-dashboard-page.component.scss',
})
export class UserDashboardPageComponent implements OnInit {
  private readonly dashboardService = inject(UserDashboardService);

  protected readonly entityActionGroups = USER_DASHBOARD_ENTITY_ACTION_GROUPS;

  protected readonly metrics: DashboardMetric[] = [
    {
      titleKey: 'portal.user.features.dashboard.metrics.routes.title',
      subtitleKey: 'portal.user.features.dashboard.metrics.routes.subtitle',
      route: USER_ROUTES_URL,
      icon: LucideMap,
      variant: 'default',
      countKey: 'routes',
    },
    {
      titleKey: 'portal.user.features.dashboard.metrics.cargo.title',
      subtitleKey: 'portal.user.features.dashboard.metrics.cargo.subtitle',
      route: USER_CARGO_URL,
      icon: LucidePackage,
      variant: 'default',
      countKey: 'cargo',
    },
    {
      titleKey: 'portal.user.features.dashboard.metrics.storage.title',
      subtitleKey: 'portal.user.features.dashboard.metrics.storage.subtitle',
      route: USER_STORAGE_URL,
      icon: LucideWarehouse,
      variant: 'default',
      countKey: 'storage',
    },
  ];

  protected readonly counts = signal<{ routes: number; cargo: number; storage: number } | null>(null);
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
