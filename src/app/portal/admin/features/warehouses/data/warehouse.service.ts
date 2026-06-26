import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { applyTableFilters } from '../../../../../shared/table/apply-table-filters';
import type { PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';

import { WAREHOUSE_MOCK_DATA } from './warehouse.mock-data';
import type { Warehouse, WarehouseFormModel } from './warehouse.model';
import { WAREHOUSE_TABLE_FILTERS } from './warehouse-table-filters';

@Injectable({ providedIn: 'root' })
export class AdminWarehouseService {
  private readonly store: Warehouse[] = structuredClone(WAREHOUSE_MOCK_DATA);

  list(query: TableQuery): Observable<PaginatedResponse<Warehouse>> {
    return of(this.paginate(this.applyQuery([...this.store], query), query)).pipe(delay(200));
  }

  getById(id: string): Observable<Warehouse> {
    const warehouse = this.store.find((item) => item.id === id);
    if (!warehouse) {
      return throwError(() => new Error(`Warehouse not found: ${id}`)).pipe(delay(150));
    }

    return of(structuredClone(warehouse)).pipe(delay(150));
  }

  create(payload: WarehouseFormModel): Observable<Warehouse> {
    const warehouse: Warehouse = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.store.unshift(warehouse);
    return of(structuredClone(warehouse)).pipe(delay(250));
  }

  update(id: string, payload: WarehouseFormModel): Observable<Warehouse> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Warehouse not found: ${id}`)).pipe(delay(150));
    }

    const updated: Warehouse = { id, ...payload };
    this.store[index] = updated;
    return of(structuredClone(updated)).pipe(delay(250));
  }

  delete(id: string): Observable<void> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Warehouse not found: ${id}`)).pipe(delay(150));
    }

    this.store.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  private applyQuery(items: Warehouse[], query: TableQuery): Warehouse[] {
    let result = applyTableFilters(items, query, WAREHOUSE_TABLE_FILTERS);

    if (query.sortField && query.sortDirection) {
      result.sort((left, right) => {
        const leftRecord = left as unknown as Record<string, unknown>;
        const rightRecord = right as unknown as Record<string, unknown>;
        return compareValues(
          leftRecord[query.sortField!],
          rightRecord[query.sortField!],
          query.sortDirection!,
        );
      });
    }

    return result;
  }

  private paginate(items: Warehouse[], query: TableQuery): PaginatedResponse<Warehouse> {
    const total = items.length;
    const start = (query.page - 1) * query.pageSize;
    const pageItems = items.slice(start, start + query.pageSize);

    return {
      items: pageItems,
      total,
      page: query.page,
      pageSize: query.pageSize,
    };
  }
}

function compareValues(
  left: unknown,
  right: unknown,
  direction: 'asc' | 'desc',
): number {
  const leftValue = normalizeSortValue(left);
  const rightValue = normalizeSortValue(right);

  if (leftValue < rightValue) {
    return direction === 'asc' ? -1 : 1;
  }

  if (leftValue > rightValue) {
    return direction === 'asc' ? 1 : -1;
  }

  return 0;
}

function normalizeSortValue(value: unknown): string | number {
  if (typeof value === 'number') {
    return value;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  return String(value ?? '').toLowerCase();
}
