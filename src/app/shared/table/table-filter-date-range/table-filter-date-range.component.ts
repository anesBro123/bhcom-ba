import { Component, computed, input, output } from '@angular/core';

import { DatePeriodPickerComponent } from '../../ui/date-period-picker/date-period-picker.component';
import { TableFilterFieldComponent } from '../table-filter-field/table-filter-field.component';
import type { FilterSummary } from '../filter-chips.utils';
import type { DateRangeFilterValue } from '../table.types';

@Component({
  selector: 'app-table-filter-date-range',
  imports: [TableFilterFieldComponent, DatePeriodPickerComponent],
  templateUrl: './table-filter-date-range.component.html',
  styleUrl: './table-filter-date-range.component.scss',
})
export class TableFilterDateRangeComponent {
  readonly titleKey = input.required<string>();
  readonly value = input.required<DateRangeFilterValue>();
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });
  readonly singleDate = input(false);

  valueChange = output<DateRangeFilterValue>();

  protected readonly isActive = computed(() => {
    const current = this.value();
    return Boolean(current.from?.trim() || current.to?.trim());
  });

  protected clearRange(): void {
    this.valueChange.emit({});
  }

  protected onValueChange(next: DateRangeFilterValue): void {
    this.valueChange.emit(next);
  }
}
