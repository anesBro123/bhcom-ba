import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideArrowDown, LucideArrowUp, LucideArrowUpDown } from '@lucide/angular';
import { Subscription } from 'rxjs';

import { bindTableDataSource } from '../table-data-source';
import { TableApiService } from '../table-api.service';
import { TableCellTemplateDirective } from '../table-cell-template.directive';
import { TableStore } from '../table.store';
import type {
  ColumnDef,
  RowActionEvent,
  TableCellContext,
  TableDefinition,
  TableLoader,
} from '../table.types';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { TableFilterBarComponent } from '../table-filter-bar/table-filter-bar.component';
import { TableRowActionsComponent } from '../table-row-actions/table-row-actions.component';

@Component({
  selector: 'app-data-table',
  imports: [
    NgTemplateOutlet,
    TranslatePipe,
    TablePaginationComponent,
    TableFilterBarComponent,
    TableRowActionsComponent,
    LucideArrowUp,
    LucideArrowDown,
    LucideArrowUpDown,
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

  private readonly api = inject(TableApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private dataSubscription: Subscription | null = null;

  protected tableStore!: TableStore<T>;
  protected readonly cellTemplateMap = signal(new Map<string, TemplateRef<TableCellContext<T>>>());

  protected readonly visibleColumns = computed(() =>
    this.definition().columns.filter((column) => !column.hidden),
  );

  protected hasActions(): boolean {
    return (this.definition().actions?.items.length ?? 0) > 0;
  }

  protected hasFilters(): boolean {
    return (this.definition().filters?.length ?? 0) > 0;
  }

  protected onFilterChange(event: { key: string; value: unknown }): void {
    this.tableStore.setFilter(event.key, event.value);
  }

  protected actionsWidth(): string {
    return this.definition().actions?.width ?? '3.5rem';
  }

  protected onRowAction(event: RowActionEvent<T>): void {
    this.rowAction.emit(event);
  }

  ngOnInit(): void {
    this.bindDataSource();
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
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
        return formatDateValue(value);
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
}

function formatDateValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
