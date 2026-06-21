import { Component, input } from '@angular/core';

import type { UserEntityStatus } from '../../constants/user-entity-status';
import { RouteDisplayComponent } from '../route-display/route-display.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { WarehouseDisplayComponent } from '../warehouse-display/warehouse-display.component';

export type EntityDetailSummaryKind = 'route' | 'warehouse';

@Component({
  selector: 'app-entity-detail-summary',
  imports: [StatusBadgeComponent, RouteDisplayComponent, WarehouseDisplayComponent],
  templateUrl: './entity-detail-summary.component.html',
  styleUrl: './entity-detail-summary.component.scss',
})
export class EntityDetailSummaryComponent {
  readonly kind = input.required<EntityDetailSummaryKind>();
  readonly status = input.required<UserEntityStatus>();
  readonly origin = input<string>();
  readonly destination = input<string>();
  readonly warehouseName = input<string>();
  readonly warehouseCity = input<string>();
}
