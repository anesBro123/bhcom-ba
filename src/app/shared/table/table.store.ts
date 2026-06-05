import { computed, signal, type WritableSignal } from '@angular/core';

import type { SortDirection, TableDefinition, TableQuery } from './table.types';

export class TableStore<T> {
  readonly query: WritableSignal<TableQuery>;
  readonly rows = signal<T[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedIds = signal<Set<string>>(new Set());

  readonly allSelected = computed(() => {
    const rows = this.rows();
    const selected = this.selectedIds();
    return rows.length > 0 && rows.every((row) => selected.has(this.getRowId(row)));
  });

  readonly someSelected = computed(() => {
    const rows = this.rows();
    const selected = this.selectedIds();
    return rows.some((row) => selected.has(this.getRowId(row))) && !this.allSelected();
  });

  constructor(private readonly definition: TableDefinition<T>) {
    this.query = signal(this.createInitialQuery());
  }

  setSort(field: string, direction: SortDirection): void {
    this.query.update((query) => ({
      ...query,
      sortField: field,
      sortDirection: direction,
      page: 1,
    }));
  }

  toggleSort(field: string): void {
    const current = this.query();
    if (current.sortField !== field) {
      this.setSort(field, 'asc');
      return;
    }

    if (current.sortDirection === 'asc') {
      this.setSort(field, 'desc');
      return;
    }

    this.setSort(field, 'asc');
  }

  setPage(page: number): void {
    this.query.update((query) => ({ ...query, page }));
  }

  setPageSize(pageSize: number): void {
    this.query.update((query) => ({ ...query, pageSize, page: 1 }));
  }

  setFilter(key: string, value: unknown): void {
    this.query.update((query) => ({
      ...query,
      filters: { ...query.filters, [key]: value || undefined },
      page: 1,
    }));
  }

  clearFilters(): void {
    this.query.update((query) => ({ ...query, filters: {}, page: 1 }));
  }

  setRows(rows: T[], total: number): void {
    this.rows.set(rows);
    this.total.set(total);
    this.pruneSelection(rows);
  }

  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }

  toggleRow(row: T): void {
    const id = this.getRowId(row);
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  toggleAll(): void {
    const rows = this.rows();
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
      return;
    }

    this.selectedIds.set(new Set(rows.map((row) => this.getRowId(row))));
  }

  isSelected(row: T): boolean {
    return this.selectedIds().has(this.getRowId(row));
  }

  reset(): void {
    this.query.set(this.createInitialQuery());
    this.rows.set([]);
    this.total.set(0);
    this.loading.set(false);
    this.error.set(null);
    this.selectedIds.set(new Set());
  }

  getRowId(row: T): string {
    const trackBy = this.definition.trackBy ?? ('id' as keyof T & string);
    return String(row[trackBy as keyof T]);
  }

  private createInitialQuery(): TableQuery {
    return {
      page: 1,
      pageSize: this.definition.defaultPageSize ?? 25,
      sortField: this.definition.defaultSort?.field ?? null,
      sortDirection: this.definition.defaultSort?.direction ?? null,
      filters: {},
    };
  }

  private pruneSelection(rows: T[]): void {
    const validIds = new Set(rows.map((row) => this.getRowId(row)));
    this.selectedIds.update((selected) => {
      const next = new Set([...selected].filter((id) => validIds.has(id)));
      return next;
    });
  }
}
