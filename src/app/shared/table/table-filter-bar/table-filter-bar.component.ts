import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronDown, LucideSearch } from '@lucide/angular';
import { debounceTime, Subject } from 'rxjs';

import { TableFilterDateRangeComponent } from '../table-filter-date-range/table-filter-date-range.component';
import { TableFilterMultiSelectComponent } from '../table-filter-multi-select/table-filter-multi-select.component';
import { TableFilterNumberRangeComponent } from '../table-filter-number-range/table-filter-number-range.component';
import type {
  DateRangeFilterValue,
  FilterDef,
  NumberRangeFilterValue,
} from '../table.types';

interface FilterGroup<T extends object> {
  titleKey?: string;
  filters: FilterDef<T>[];
}

@Component({
  selector: 'app-table-filter-bar',
  imports: [
    FormsModule,
    TranslatePipe,
    LucideSearch,
    LucideChevronDown,
    TableFilterMultiSelectComponent,
    TableFilterDateRangeComponent,
    TableFilterNumberRangeComponent,
  ],
  templateUrl: './table-filter-bar.component.html',
  styleUrl: './table-filter-bar.component.scss',
})
export class TableFilterBarComponent<T extends object> implements OnInit {
  filters = input.required<FilterDef<T>[]>();
  values = input.required<Record<string, unknown>>();
  closeDropdownsToken = input(0);

  filterChange = output<{ key: string; value: unknown }>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput$ = new Subject<{ key: string; value: string; debounceMs: number }>();

  protected readonly filterGroups = computed(() => buildFilterGroups(this.filters()));

  ngOnInit(): void {
    this.searchInput$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ key, value }) => {
        this.filterChange.emit({ key, value: value || undefined });
      });
  }

  protected filterValue(key: string): string {
    const value = this.values()[key];
    return value === null || value === undefined ? '' : String(value);
  }

  protected multiSelectValue(key: string): string[] {
    const value = this.values()[key];
    return Array.isArray(value) ? (value as string[]) : [];
  }

  protected dateRangeValue(key: string): DateRangeFilterValue {
    const value = this.values()[key];
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    return value as DateRangeFilterValue;
  }

  protected numberRangeValue(key: string): NumberRangeFilterValue {
    const value = this.values()[key];
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    return value as NumberRangeFilterValue;
  }

  protected onSearchInput(filter: FilterDef<T>, value: string): void {
    if (filter.type !== 'search') {
      return;
    }

    this.searchInput$.next({
      key: filter.key,
      value,
      debounceMs: filter.debounceMs ?? 300,
    });
  }

  protected onSelectChange(key: string, value: string): void {
    this.filterChange.emit({ key, value: value || undefined });
  }

  protected onFilterValueChange(key: string, value: unknown): void {
    this.filterChange.emit({ key, value });
  }
}

function buildFilterGroups<T extends object>(filters: FilterDef<T>[]): FilterGroup<T>[] {
  const groups: FilterGroup<T>[] = [];
  let current: FilterGroup<T> | null = null;

  for (const filter of filters) {
    const titleKey = filter.groupTitleKey;

    if (!current || current.titleKey !== titleKey) {
      current = { titleKey, filters: [] };
      groups.push(current);
    }

    current.filters.push(filter);
  }

  return groups;
}
