import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import type { DateRangeFilterValue } from '../table.types';

@Component({
  selector: 'app-table-filter-date-range',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './table-filter-date-range.component.html',
  styleUrl: './table-filter-date-range.component.scss',
})
export class TableFilterDateRangeComponent {
  readonly titleKey = input.required<string>();
  readonly value = input.required<DateRangeFilterValue>();

  valueChange = output<DateRangeFilterValue>();

  protected onFromChange(value: string): void {
    this.emitChange({ ...this.value(), from: value || undefined });
  }

  protected onToChange(value: string): void {
    this.emitChange({ ...this.value(), to: value || undefined });
  }

  private emitChange(next: DateRangeFilterValue): void {
    const cleaned: DateRangeFilterValue = {};
    if (next.from?.trim()) {
      cleaned.from = next.from.trim();
    }
    if (next.to?.trim()) {
      cleaned.to = next.to.trim();
    }

    const hasValue = Boolean(cleaned.from || cleaned.to);
    this.valueChange.emit(hasValue ? cleaned : {});
  }
}
