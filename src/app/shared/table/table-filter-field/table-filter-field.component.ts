import { Component, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronDown, LucideChevronUp } from '@lucide/angular';

import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { VehicleTypeDisplayComponent } from '../../ui/vehicle-type-display/vehicle-type-display.component';
import type { FilterSummary } from '../filter-chips.utils';

@Component({
  selector: 'app-table-filter-field',
  imports: [TranslatePipe, LucideChevronDown, LucideChevronUp, StatusBadgeComponent, VehicleTypeDisplayComponent],
  templateUrl: './table-filter-field.component.html',
  styleUrl: './table-filter-field.component.scss',
})
export class TableFilterFieldComponent {
  readonly titleKey = input.required<string>();
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });
  readonly showClear = input(false);

  clear = output<void>();
  expandedChange = output<boolean>();

  protected readonly expanded = signal(true);

  protected toggleExpanded(): void {
    if (!this.collapsible()) {
      return;
    }

    this.expanded.update((open) => {
      const next = !open;
      this.expandedChange.emit(next);
      return next;
    });
  }

  protected onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.clear.emit();
  }
}
