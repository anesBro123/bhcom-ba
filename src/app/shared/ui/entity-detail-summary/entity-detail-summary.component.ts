import { Component, input } from '@angular/core';

import type { UserEntityStatus } from '../../constants/user-entity-status';
import { RouteDisplayComponent } from '../route-display/route-display.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { VehicleDisplayComponent } from '../vehicle-display/vehicle-display.component';
import { WarehouseDisplayComponent } from '../warehouse-display/warehouse-display.component';

export type EntityDetailSummaryKind = 'route' | 'warehouse' | 'user' | 'vehicle';

@Component({
  selector: 'app-entity-detail-summary',
  imports: [
    StatusBadgeComponent,
    RouteDisplayComponent,
    VehicleDisplayComponent,
    WarehouseDisplayComponent,
  ],
  templateUrl: './entity-detail-summary.component.html',
  styleUrl: './entity-detail-summary.component.scss',
})
export class EntityDetailSummaryComponent {
  readonly kind = input.required<EntityDetailSummaryKind>();
  readonly status = input<UserEntityStatus>();
  readonly origin = input<string>();
  readonly destination = input<string>();
  readonly warehouseName = input<string>();
  readonly warehouseCity = input<string>();
  readonly firstName = input<string>();
  readonly lastName = input<string>();
  readonly email = input<string>();
  readonly vehicleName = input<string>();
  readonly vehiclePlate = input<string>();
}
