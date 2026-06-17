import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { AuthService } from '../../../../../shared/core/auth/auth.service';
import { belongsToCompany, isExternalToCompany } from '../../../../../shared/constants/user-list-scope';
import type { FilterDef, PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';

import { ROUTE_MOCK_DATA } from './route.mock-data';
import type { Route, RouteFormModel } from './route.model';
import { RouteAllTable } from '../table-all/route-all.table';
import { RouteMyTable } from '../table-my/route-my.table';

export interface RouteCreatePayload extends RouteFormModel {
  vehiclePlate: string;
  vehicleName: string;
}

@Injectable({ providedIn: 'root' })
export class UserRouteService {
  private readonly authService = inject(AuthService);
  private readonly store: Route[] = structuredClone(ROUTE_MOCK_DATA);

  listMine(query: TableQuery): Observable<PaginatedResponse<Route>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => belongsToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query, RouteMyTable.filters), query)).pipe(
      delay(200),
    );
  }

  listAll(query: TableQuery): Observable<PaginatedResponse<Route>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => isExternalToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query, RouteAllTable.filters), query)).pipe(
      delay(200),
    );
  }

  getById(id: string): Observable<Route> {
    const item = this.store.find((entry) => entry.id === id);
    if (!item) {
      return throwError(() => new Error(`Route not found: ${id}`)).pipe(delay(150));
    }

    return of(structuredClone(item)).pipe(delay(150));
  }

  create(payload: RouteCreatePayload): Observable<Route> {
    const user = this.authService.user()!;
    const item: Route = {
      id: crypto.randomUUID(),
      publishedAt: new Date().toISOString(),
      status: 'open',
      companyId: user.companyId,
      publisherId: user.id,
      ...payload,
    };
    this.store.unshift(item);
    return of(structuredClone(item)).pipe(delay(250));
  }

  update(id: string, payload: RouteCreatePayload): Observable<Route> {
    const index = this.store.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Route not found: ${id}`)).pipe(delay(150));
    }

    const updated: Route = {
      ...this.store[index],
      ...payload,
    };
    this.store[index] = updated;
    return of(structuredClone(updated)).pipe(delay(250));
  }

  delete(id: string): Observable<void> {
    const index = this.store.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Route not found: ${id}`)).pipe(delay(150));
    }

    this.store.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  private applyQuery(
    items: Route[],
    query: TableQuery,
    filters: FilterDef<Route>[] | undefined,
  ): Route[] {
    let result = items;

    for (const [key, value] of Object.entries(query.filters)) {
      if (value === null || value === undefined || value === '') {
        continue;
      }

      const filterDef = filters?.find((filter) => filter.key === key);
      result = result.filter((item) => {
        const record = item as unknown as Record<string, unknown>;

        if (filterDef?.type === 'search') {
          const fields = filterDef.searchFields ?? [filterDef.key];
          const needle = String(value).toLowerCase();
          return fields.some((field) => {
            const fieldValue = record[field];
            return fieldValue !== null && String(fieldValue).toLowerCase().includes(needle);
          });
        }

        return String(record[key]) === String(value);
      });
    }

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

  private paginate(items: Route[], query: TableQuery): PaginatedResponse<Route> {
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
