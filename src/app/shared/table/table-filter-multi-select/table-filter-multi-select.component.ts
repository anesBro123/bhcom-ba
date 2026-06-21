import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideChevronDown, LucideSearch } from '@lucide/angular';

import { isUserEntityStatus, type UserEntityStatus } from '../../constants/user-entity-status';
import { isVehicleType, type VehicleType } from '../../constants/vehicle-type';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge.component';
import { VehicleTypeDisplayComponent } from '../../ui/vehicle-type-display/vehicle-type-display.component';
import { normalizeForSearch } from '../../utils/normalize-for-search';
import {
  FILTER_SUMMARY_MAX_VISIBLE,
  truncateFilterSelection,
  type FilterSummary,
} from '../filter-chips.utils';
import { TableFilterFieldComponent } from '../table-filter-field/table-filter-field.component';
import type { FilterOption } from '../table.types';

@Component({
  selector: 'app-table-filter-multi-select',
  imports: [
    NgTemplateOutlet,
    FormsModule,
    TranslatePipe,
    StatusBadgeComponent,
    VehicleTypeDisplayComponent,
    TableFilterFieldComponent,
    LucideChevronDown,
    LucideSearch,
  ],
  templateUrl: './table-filter-multi-select.component.html',
  styleUrl: './table-filter-multi-select.component.scss',
})
export class TableFilterMultiSelectComponent {
  readonly titleKey = input.required<string>();
  readonly placeholderKey = input.required<string>();
  readonly options = input.required<FilterOption[]>();
  readonly selected = input.required<string[]>();
  readonly searchable = input(true);
  readonly showOptionIcons = input(false);
  readonly showStatusBadges = input(false);
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });
  readonly closeDropdownsToken = input(0);

  valueChange = output<string[]>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);

  protected readonly panelOpen = signal(false);
  protected readonly searchQuery = signal('');

  constructor() {
    effect(() => {
      this.closeDropdownsToken();
      this.panelOpen.set(false);
      this.searchQuery.set('');
    });
  }

  protected readonly selectedSummary = computed(() => {
    const selected = this.selected();
    if (selected.length === 0) {
      return '';
    }

    return selected.map((value) => this.resolveOptionLabel(value)).join(', ');
  });

  protected readonly triggerStatuses = computed(() => {
    if (!this.showStatusBadges()) {
      return { visible: [] as UserEntityStatus[], overflowCount: 0 };
    }

    const statuses = this.selected().filter(isUserEntityStatus) as UserEntityStatus[];
    return truncateFilterSelection(statuses, FILTER_SUMMARY_MAX_VISIBLE);
  });

  protected readonly triggerVehicleTypes = computed(() => {
    if (!this.showOptionIcons()) {
      return { visible: [] as VehicleType[], overflowCount: 0 };
    }

    const vehicleTypes = this.selected().filter(isVehicleType) as VehicleType[];
    return truncateFilterSelection(vehicleTypes, FILTER_SUMMARY_MAX_VISIBLE);
  });

  protected readonly selectedOptions = computed(() => {
    const selected = new Set(this.selected());
    const query = normalizeForSearch(this.searchQuery());

    return this.options()
      .filter((option) => selected.has(option.value))
      .filter((option) => {
        if (!query) {
          return true;
        }

        return normalizeForSearch(this.resolveOptionLabel(option.value)).includes(query);
      })
      .sort((left, right) =>
        this.resolveOptionLabel(left.value).localeCompare(this.resolveOptionLabel(right.value)),
      );
  });

  protected readonly unselectedOptions = computed(() => {
    const selected = new Set(this.selected());
    const query = normalizeForSearch(this.searchQuery());

    return this.options()
      .filter((option) => !selected.has(option.value))
      .filter((option) => {
        if (!query) {
          return true;
        }

        return normalizeForSearch(this.resolveOptionLabel(option.value)).includes(query);
      })
      .sort((left, right) =>
        this.resolveOptionLabel(left.value).localeCompare(this.resolveOptionLabel(right.value)),
      );
  });

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.panelOpen.set(false);
    }
  }

  protected togglePanel(): void {
    this.panelOpen.update((open) => !open);
    if (!this.panelOpen()) {
      this.searchQuery.set('');
    }
  }

  protected isSelected(value: string): boolean {
    return this.selected().includes(value);
  }

  protected onToggleOption(value: string, checked: boolean): void {
    const current = this.selected();
    const next = checked ? [...current, value] : current.filter((item) => item !== value);
    this.valueChange.emit(next);
  }

  protected clearSelection(): void {
    this.valueChange.emit([]);
  }

  protected onAccordionExpanded(expanded: boolean): void {
    if (!expanded) {
      this.panelOpen.set(false);
      this.searchQuery.set('');
    }
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

  private resolveOptionLabel(value: string): string {
    const option = this.options().find((item) => item.value === value);
    if (!option) {
      return value;
    }

    if (option.labelKey && !option.label) {
      return this.translate.instant(option.labelKey);
    }

    return option.label ?? option.value;
  }
}
