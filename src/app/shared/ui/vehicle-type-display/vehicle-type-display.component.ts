import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideBike,
  LucideBus,
  LucideCar,
  LucideCaravan,
  LucideTractor,
  LucideTruck,
} from '@lucide/angular';

import type { VehicleType } from '../../constants/vehicle-type';
import { vehicleTypeLabelKey } from '../../constants/vehicle-type';

@Component({
  selector: 'app-vehicle-type-display',
  imports: [
    TranslatePipe,
    LucideCar,
    LucideTruck,
    LucideBike,
    LucideBus,
    LucideCaravan,
    LucideTractor,
  ],
  templateUrl: './vehicle-type-display.component.html',
  styleUrl: './vehicle-type-display.component.scss',
})
export class VehicleTypeDisplayComponent {
  readonly vehicleType = input.required<VehicleType>();
  readonly showLabel = input(true);

  protected labelKey(type: VehicleType): string {
    return vehicleTypeLabelKey(type);
  }
}
