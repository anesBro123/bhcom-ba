import { Component, computed, inject, input, output } from '@angular/core';
import { LucideX } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { VehicleTypeDisplayComponent } from '../../ui/vehicle-type-display/vehicle-type-display.component';
import { buildFilterChips, type FilterChip } from '../filter-chips.utils';
import type { FilterDef } from '../table.types';

@Component({
  selector: 'app-table-filter-chips',
  imports: [TranslatePipe, StatusBadgeComponent, VehicleTypeDisplayComponent, LucideX],
  templateUrl: './table-filter-chips.component.html',
  styleUrl: './table-filter-chips.component.scss',
})
export class TableFilterChipsComponent<T> {
  readonly filters = input.required<FilterDef<T>[]>();
  readonly values = input.required<Record<string, unknown>>();

  chipRemove = output<{ filterKey: string }>();

  private readonly translate = inject(TranslateService);

  protected readonly chips = computed(() =>
    buildFilterChips(this.filters(), this.values(), this.translate),
  );

  protected onRemove(chip: FilterChip): void {
    this.chipRemove.emit({ filterKey: chip.filterKey });
  }
}
