import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { freightSizeUnitLabelKey } from '../../data/freight.constants';
import type { FreightType } from '../../data/freight.model';

@Component({
  selector: 'app-freight-size-display',
  imports: [TranslatePipe],
  templateUrl: './freight-size-display.component.html',
  styleUrl: './freight-size-display.component.scss',
})
export class FreightSizeDisplayComponent {
  readonly size = input.required<number | null>();
  readonly freightType = input.required<FreightType>();

  protected readonly unitKey = computed(() =>
    freightSizeUnitLabelKey(this.freightType(), this.size()),
  );
}
