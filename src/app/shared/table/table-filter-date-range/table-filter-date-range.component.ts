import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { TableFilterFieldComponent } from '../table-filter-field/table-filter-field.component';
import type { FilterSummary } from '../filter-chips.utils';
import type { DateRangeFilterValue } from '../table.types';

@Component({
  selector: 'app-table-filter-date-range',
  imports: [FormsModule, TranslatePipe, TableFilterFieldComponent],
  templateUrl: './table-filter-date-range.component.html',
  styleUrl: './table-filter-date-range.component.scss',
})
export class TableFilterDateRangeComponent {
  readonly titleKey = input.required<string>();
  readonly value = input.required<DateRangeFilterValue>();
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });

  valueChange = output<DateRangeFilterValue>();

  protected readonly isActive = computed(() => {
    const current = this.value();
    return Boolean(current.from?.trim() || current.to?.trim());
  });

  protected clearRange(): void {
    this.valueChange.emit({});
  }

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
