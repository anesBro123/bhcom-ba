import {
  Component,
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

import type { FilterDef } from '../table.types';

@Component({
  selector: 'app-table-filter-bar',
  imports: [FormsModule, TranslatePipe, LucideSearch, LucideChevronDown],
  templateUrl: './table-filter-bar.component.html',
  styleUrl: './table-filter-bar.component.scss',
})
export class TableFilterBarComponent<T extends object> implements OnInit {
  filters = input.required<FilterDef<T>[]>();
  values = input.required<Record<string, unknown>>();

  filterChange = output<{ key: string; value: unknown }>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput$ = new Subject<{ key: string; value: string; debounceMs: number }>();

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
}
