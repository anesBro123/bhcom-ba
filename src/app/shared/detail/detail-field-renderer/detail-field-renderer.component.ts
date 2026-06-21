import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import type { UserEntityStatus } from '../../constants/user-entity-status';
import { RouteDisplayComponent } from '../../ui/route-display/route-display.component';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { VehicleDisplayComponent } from '../../ui/vehicle-display/vehicle-display.component';
import { WarehouseDisplayComponent } from '../../ui/warehouse-display/warehouse-display.component';
import {
  formatDetailDateValue,
  formatDetailNumberValue,
  formatDetailTextValue,
} from '../detail-format.utils';
import type {
  DetailFieldDef,
  DetailKeyedFieldDef,
  DetailRouteFieldDef,
  DetailTranslateFieldDef,
  DetailVehicleFieldDef,
  DetailWarehouseFieldDef,
} from '../detail.types';

@Component({
  selector: 'app-detail-field-renderer',
  imports: [
    TranslatePipe,
    RouteDisplayComponent,
    StatusBadgeComponent,
    VehicleDisplayComponent,
    WarehouseDisplayComponent,
  ],
  templateUrl: './detail-field-renderer.component.html',
  styleUrl: './detail-field-renderer.component.scss',
})
export class DetailFieldRendererComponent<T extends object> {
  readonly field = input.required<DetailFieldDef<T>>();
  readonly data = input.required<T>();

  protected asTextField(): DetailKeyedFieldDef<T> {
    return this.field() as DetailKeyedFieldDef<T>;
  }

  protected asRouteField(): DetailRouteFieldDef<T> {
    return this.field() as DetailRouteFieldDef<T>;
  }

  protected asVehicleField(): DetailVehicleFieldDef<T> {
    return this.field() as DetailVehicleFieldDef<T>;
  }

  protected asWarehouseField(): DetailWarehouseFieldDef<T> {
    return this.field() as DetailWarehouseFieldDef<T>;
  }

  protected asTranslateField(): DetailTranslateFieldDef<T> {
    return this.field() as DetailTranslateFieldDef<T>;
  }

  protected textValue(key: keyof T & string): string {
    return formatDetailTextValue(this.data()[key]);
  }

  protected dateValue(key: keyof T & string): string {
    return formatDetailDateValue(this.data()[key]);
  }

  protected numberValue(key: keyof T & string): string {
    return formatDetailNumberValue(this.data()[key]);
  }

  protected statusValue(key: keyof T & string): UserEntityStatus {
    return this.data()[key] as UserEntityStatus;
  }

  protected stringValue(key: keyof T & string): string {
    return String(this.data()[key] ?? '');
  }

  protected translateLabelKey(field: DetailTranslateFieldDef<T>, value: unknown): string | null {
    const option = field.options.find((item) => item.value === String(value));
    return option?.labelKey ?? option?.label ?? null;
  }
}
