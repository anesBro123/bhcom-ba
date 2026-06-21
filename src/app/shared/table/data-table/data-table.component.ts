import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  TemplateRef,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideArrowUpDown,
  LucideListFilter,
  LucideSearch,
  LucideX,
} from '@lucide/angular';
import { debounceTime, Subject, Subscription } from 'rxjs';

import { bindTableDataSource } from '../table-data-source';
import { TableApiService } from '../table-api.service';
import { TableCellTemplateDirective } from '../table-cell-template.directive';
import { TableStore } from '../table.store';
import type {
  ColumnDef,
  FilterDef,
  RowActionEvent,
  TableCellContext,
  TableDefinition,
  TableLoader,
} from '../table.types';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { TableFilterBarComponent } from '../table-filter-bar/table-filter-bar.component';
import { TableFilterChipsComponent } from '../table-filter-chips/table-filter-chips.component';
import { countActiveFilters } from '../apply-table-filters';
import {
  filterPanelStorageKey,
  loadFilterPanelExpanded,
  saveFilterPanelExpanded,
} from '../table-filter-storage';
import { TableRowActionsComponent } from '../table-row-actions/table-row-actions.component';
import { MOBILE_MEDIA_QUERY } from '../../../portal/shell/viewport';
import { formatDisplayDate } from '../../utils/format-display-date';

@Component({
  selector: 'app-data-table',
  imports: [
    NgTemplateOutlet,
    TranslatePipe,
    TablePaginationComponent,
    TableFilterBarComponent,
    TableFilterChipsComponent,
    TableRowActionsComponent,
    LucideArrowUp,
    LucideArrowDown,
    LucideArrowUpDown,
    LucideListFilter,
    LucideSearch,
    LucideX,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends object> implements OnInit, AfterContentInit, OnDestroy {
  definition = input.required<TableDefinition<T>>();
  loader = input<TableLoader<T>>();
  rowAction = output<RowActionEvent<T>>();

  @ContentChildren(TableCellTemplateDirective)
  private readonly cellTemplateDirectives!: QueryList<TableCellTemplateDirective>;

  @ViewChild('filterFlyoutClose')
  private filterFlyoutClose?: ElementRef<HTMLButtonElement>;

  private readonly api = inject(TableApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly platformId = inject(PLATFORM_ID);
  private dataSubscription: Subscription | null = null;
  private mediaQuery: MediaQueryList | null = null;
  private readonly searchInput$ = new Subject<{ key: string; value: string }>();

  protected tableStore!: TableStore<T>;
  protected readonly cellTemplateMap = signal(new Map<string, TemplateRef<TableCellContext<T>>>());
  protected readonly isMobileLayout = signal(false);
  protected readonly filtersPanelExpanded = signal(false);
  protected readonly closeFilterDropdownsToken = signal(0);

  protected readonly activeFilterCount = computed(() =>
    countActiveFilters(this.tableStore.query().filters, this.definition().filters),
  );

  protected readonly searchFilters = computed((): Extract<FilterDef<T>, { type: 'search' }>[] => {
    const filters = this.definition().filters ?? [];
    return filters.filter(
      (filter): filter is Extract<FilterDef<T>, { type: 'search' }> => filter.type === 'search',
    );
  });

  protected readonly visibleColumns = computed(() =>
    this.definition().columns.filter((column) => !column.hidden),
  );

  protected readonly primaryColumn = computed((): ColumnDef<T> | undefined => {
    const columns = this.visibleColumns();
    return columns.find((column) => column.mobile?.primary) ?? columns[0];
  });

  protected readonly cardBodyColumns = computed(() => {
    const primary = this.primaryColumn();
    if (!primary) {
      return [];
    }

    return this.visibleColumns().filter(
      (column) => column.key !== primary.key && !column.mobile?.hidden,
    );
  });

  protected hasActions(): boolean {
    return (this.definition().actions?.items.length ?? 0) > 0;
  }

  protected hasFilters(): boolean {
    return (this.definition().filters?.length ?? 0) > 0;
  }

  protected onFilterChange(event: { key: string; value: unknown }): void {
    const hadActive = this.tableStore.hasActiveFilters();
    this.tableStore.setFilter(event.key, event.value);

    const filterDef = this.definition().filters?.find((filter) => filter.key === event.key);
    const isSearchFilter = filterDef?.type === 'search';

    if (
      !isSearchFilter &&
      !hadActive &&
      this.tableStore.hasActiveFilters() &&
      !this.filtersPanelExpanded()
    ) {
      this.filtersPanelExpanded.set(true);
      this.persistFilterPanelExpanded(true);
      this.syncFlyoutBodyScroll(true);
    }
  }

  protected onClearFilters(): void {
    this.tableStore.clearFilters();
  }

  protected toggleFilterPanel(): void {
    this.filtersPanelExpanded.update((expanded) => {
      const next = !expanded;
      if (!next) {
        this.closeFilterDropdownsToken.update((token) => token + 1);
      }
      this.persistFilterPanelExpanded(next);
      this.syncFlyoutBodyScroll(next);
      return next;
    });
  }

  protected closeFilterPanel(): void {
    if (!this.filtersPanelExpanded()) {
      return;
    }

    this.filtersPanelExpanded.set(false);
    this.closeFilterDropdownsToken.update((token) => token + 1);
    this.persistFilterPanelExpanded(false);
    this.syncFlyoutBodyScroll(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    if (this.filtersPanelExpanded()) {
      this.closeFilterPanel();
    }
  }

  protected searchFilterValue(key: string): string {
    const value = this.tableStore.query().filters[key];
    return value === null || value === undefined ? '' : String(value);
  }

  protected onSearchInput(filter: Extract<FilterDef<T>, { type: 'search' }>, value: string): void {
    this.searchInput$.next({ key: filter.key, value });
  }

  protected onChipRemove(event: { filterKey: string }): void {
    this.tableStore.setFilter(event.filterKey, undefined);
  }

  protected showFilterChips(): boolean {
    return this.definition().showFilterChips ?? true;
  }

  protected actionsWidth(): string {
    return this.definition().actions?.width ?? '3.5rem';
  }

  protected onRowAction(event: RowActionEvent<T>): void {
    this.rowAction.emit(event);
  }

  constructor() {
    effect(() => {
      if (!this.filtersPanelExpanded()) {
        return;
      }

      queueMicrotask(() => this.filterFlyoutClose?.nativeElement.focus());
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
      const updateLayout = (): void => {
        const mobile = this.mediaQuery?.matches ?? false;
        this.isMobileLayout.set(mobile);

        if (!mobile || !this.filtersPanelExpanded()) {
          if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = '';
          }
        } else {
          this.syncFlyoutBodyScroll(true);
        }
      };

      updateLayout();
      this.mediaQuery.addEventListener('change', updateLayout);

      this.destroyRef.onDestroy(() => {
        this.mediaQuery?.removeEventListener('change', updateLayout);
      });
    });
  }

  ngOnInit(): void {
    this.bindDataSource();

    this.searchInput$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ key, value }) => {
        this.onFilterChange({ key, value: value || undefined });
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  ngAfterContentInit(): void {
    this.syncCellTemplates();
    this.cellTemplateDirectives.changes.subscribe(() => this.syncCellTemplates());
  }

  protected cellTemplate(key: string): TemplateRef<TableCellContext<T>> | null {
    return this.cellTemplateMap().get(key) ?? null;
  }

  protected isSorted(column: ColumnDef<T>): boolean {
    return this.tableStore.query().sortField === column.key;
  }

  protected sortDirection(column: ColumnDef<T>): 'asc' | 'desc' | null {
    if (this.tableStore.query().sortField !== column.key) {
      return null;
    }

    return this.tableStore.query().sortDirection;
  }

  protected onSort(column: ColumnDef<T>): void {
    if (!column.sortable) {
      return;
    }

    this.tableStore.toggleSort(column.key);
  }

  protected onToggleAll(): void {
    this.tableStore.toggleAll();
  }

  protected onToggleRow(row: T): void {
    this.tableStore.toggleRow(row);
  }

  protected isSelected(row: T): boolean {
    return this.tableStore.isSelected(row);
  }

  protected formatValue(row: T, column: ColumnDef<T>): string {
    const value = row[column.key as keyof T];

    switch (column.format) {
      case 'number':
        return new Intl.NumberFormat().format(Number(value));
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(value));
      case 'date':
        return formatDisplayDate(value);
      default:
        return value === null || value === undefined ? '' : String(value);
    }
  }

  protected cellContext(row: T, column: ColumnDef<T>): TableCellContext<T> {
    return {
      $implicit: row,
      value: row[column.key as keyof T],
      columnKey: column.key,
    };
  }

  protected trackRow(row: T): string {
    return this.tableStore.getRowId(row);
  }

  private bindDataSource(): void {
    this.dataSubscription?.unsubscribe();

    this.tableStore = new TableStore(this.definition());
    this.hydrateFilterPanelExpanded();
    this.dataSubscription = bindTableDataSource(
      this.tableStore,
      this.definition(),
      this.loader(),
      this.api,
      this.destroyRef,
      this.injector,
    );
  }

  private syncCellTemplates(): void {
    const map = new Map<string, TemplateRef<TableCellContext<T>>>();

    for (const directive of this.cellTemplateDirectives) {
      map.set(
        directive.columnKey(),
        directive.template as TemplateRef<TableCellContext<T>>,
      );
    }

    this.cellTemplateMap.set(map);
  }

  private hydrateFilterPanelExpanded(): void {
    const storageKey = this.definition().filterStorageKey;
    if (!storageKey) {
      this.filtersPanelExpanded.set(false);
      return;
    }

    this.filtersPanelExpanded.set(
      loadFilterPanelExpanded(filterPanelStorageKey(storageKey)),
    );
  }

  private syncFlyoutBodyScroll(open: boolean): void {
    if (!isPlatformBrowser(this.platformId) || !this.isMobileLayout()) {
      return;
    }

    document.body.style.overflow = open ? 'hidden' : '';
  }

  private persistFilterPanelExpanded(expanded: boolean): void {
    const storageKey = this.definition().filterStorageKey;
    if (!storageKey) {
      return;
    }

    saveFilterPanelExpanded(filterPanelStorageKey(storageKey), expanded);
  }
}

