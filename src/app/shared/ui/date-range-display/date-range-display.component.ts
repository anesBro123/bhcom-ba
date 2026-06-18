import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { formatDisplayDate } from '../../utils/format-display-date';

@Component({
  selector: 'app-date-range-display',
  imports: [TranslatePipe],
  templateUrl: './date-range-display.component.html',
  styleUrl: './date-range-display.component.scss',
})
export class DateRangeDisplayComponent {
  readonly from = input.required<string>();
  readonly to = input<string>('');

  protected readonly formattedFrom = computed(() => formatDisplayDate(this.from()));
  protected readonly formattedTo = computed(() => formatDisplayDate(this.to()));
  protected readonly isRange = computed(() => Boolean(this.to()?.trim()));
}
