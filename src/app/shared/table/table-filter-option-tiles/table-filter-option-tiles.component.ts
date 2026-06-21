import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { isUserEntityStatus, type UserEntityStatus } from '../../constants/user-entity-status';
import { isVehicleType, type VehicleType } from '../../constants/vehicle-type';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { VehicleTypeDisplayComponent } from '../../ui/vehicle-type-display/vehicle-type-display.component';
import type { FilterSummary } from '../filter-chips.utils';
import type { FilterOption } from '../table.types';
import { TableFilterFieldComponent } from '../table-filter-field/table-filter-field.component';

@Component({
  selector: 'app-table-filter-option-tiles',
  imports: [
    TranslatePipe,
    StatusBadgeComponent,
    VehicleTypeDisplayComponent,
    TableFilterFieldComponent,
  ],
  templateUrl: './table-filter-option-tiles.component.html',
  styleUrl: './table-filter-option-tiles.component.scss',
})
export class TableFilterOptionTilesComponent {
  readonly titleKey = input.required<string>();
  readonly options = input.required<FilterOption[]>();
  readonly selected = input.required<string[]>();
  readonly showOptionIcons = input(false);
  readonly showStatusBadges = input(false);
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });

  valueChange = output<string[]>();

  protected isSelected(value: string): boolean {
    return this.selected().includes(value);
  }

  protected onToggleOption(value: string): void {
    const current = this.selected();
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    this.valueChange.emit(next);
  }

  protected clearSelection(): void {
    this.valueChange.emit([]);
  }

  protected showStatusBadge(value: string): boolean {
    return this.showStatusBadges() && isUserEntityStatus(value);
  }

  protected statusValue(value: string): UserEntityStatus {
    return value as UserEntityStatus;
  }

  protected vehicleTypeValue(value: string): VehicleType | null {
    if (!this.showOptionIcons() || !isVehicleType(value)) {
      return null;
    }

    return value;
  }

  protected isLabelKey(option: FilterOption): boolean {
    return Boolean(option.labelKey && !option.label);
  }
}
