import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import type { PaginatedResponse, FilterDef, SortDirection, TableDefinition, TableQuery } from './table.types';

@Injectable({ providedIn: 'root' })
export class TableApiService {
  private readonly http = inject(HttpClient);

  load<T>(definition: TableDefinition<T>, query: TableQuery): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.sortField && query.sortDirection) {
      params = params.set('sort', query.sortField).set('direction', query.sortDirection);
    }

    for (const [key, value] of Object.entries(query.filters)) {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return this.http.get<PaginatedResponse<T>>(definition.endpoint, { params });
  }

  loadMock<T extends object>(
    items: T[],
    query: TableQuery,
    filterDefs?: FilterDef<T>[],
    delayMs = 150,
  ): Observable<PaginatedResponse<T>> {
    let result = [...items];

    for (const [key, value] of Object.entries(query.filters)) {
      if (value === null || value === undefined || value === '') {
        continue;
      }

      const filterDef = filterDefs?.find((filter) => filter.key === key);
      const recordMatches = (item: T): boolean => {
        const record = item as Record<string, unknown>;

        if (filterDef?.type === 'search') {
          const fields = filterDef.searchFields ?? [filterDef.key];
          const needle = String(value).toLowerCase();

          return fields.some((field) => {
            const fieldValue = record[field];
            return fieldValue !== null && String(fieldValue).toLowerCase().includes(needle);
          });
        }

        return String(record[key]) === String(value);
      };

      result = result.filter(recordMatches);
    }

    if (query.sortField && query.sortDirection) {
      result.sort((left, right) => {
        const leftRecord = left as Record<string, unknown>;
        const rightRecord = right as Record<string, unknown>;
        return compareValues(
          leftRecord[query.sortField!],
          rightRecord[query.sortField!],
          query.sortDirection!,
        );
      });
    }

    const total = result.length;
    const start = (query.page - 1) * query.pageSize;
    const pageItems = result.slice(start, start + query.pageSize);

    return of({
      items: pageItems,
      total,
      page: query.page,
      pageSize: query.pageSize,
    }).pipe(delay(delayMs));
  }
}

function compareValues(
  left: unknown,
  right: unknown,
  direction: SortDirection,
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
