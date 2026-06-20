import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { cargoSizeUnitLabelKey } from '../../data/cargo.constants';
import type { CargoType } from '../../data/cargo.model';

@Component({
  selector: 'app-cargo-size-display',
  imports: [TranslatePipe],
  templateUrl: './cargo-size-display.component.html',
  styleUrl: './cargo-size-display.component.scss',
})
export class CargoSizeDisplayComponent {
  readonly size = input.required<number | null>();
  readonly cargoType = input.required<CargoType>();

  protected readonly unitKey = computed(() =>
    cargoSizeUnitLabelKey(this.cargoType(), this.size()),
  );
}
