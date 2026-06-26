import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { applyTableFilters } from '../../../../../shared/table/apply-table-filters';
import type { PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';

import { USER_MOCK_DATA } from './user.mock-data';
import type { User, UserFormModel } from './user.model';
import { USER_TABLE_FILTERS } from './user-table-filters';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private readonly store: User[] = structuredClone(USER_MOCK_DATA);

  list(query: TableQuery): Observable<PaginatedResponse<User>> {
    return of(this.paginate(this.applyQuery([...this.store], query), query)).pipe(delay(200));
  }

  getById(id: string): Observable<User> {
    const user = this.store.find((item) => item.id === id);
    if (!user) {
      return throwError(() => new Error(`User not found: ${id}`)).pipe(delay(150));
    }

    return of(structuredClone(user)).pipe(delay(150));
  }

  create(payload: UserFormModel): Observable<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.store.unshift(user);
    return of(structuredClone(user)).pipe(delay(250));
  }

  update(id: string, payload: UserFormModel): Observable<User> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`User not found: ${id}`)).pipe(delay(150));
    }

    const updated: User = { id, ...payload };
    this.store[index] = updated;
    return of(structuredClone(updated)).pipe(delay(250));
  }

  delete(id: string): Observable<void> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`User not found: ${id}`)).pipe(delay(150));
    }

    this.store.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  private applyQuery(items: User[], query: TableQuery): User[] {
    let result = applyTableFilters(items, query, USER_TABLE_FILTERS);

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

  private paginate(items: User[], query: TableQuery): PaginatedResponse<User> {
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
