import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { AuthService } from '../../../../../shared/core/auth/auth.service';
import { belongsToCompany, isExternalToCompany } from '../../../../../shared/constants/user-list-scope';
import { applyTableFilters } from '../../../../../shared/table/apply-table-filters';
import type { PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';
import { CompanyVehicleService } from '../../../data/company-vehicle.service';

import { ROUTE_TABLE_FILTERS } from './route-table-filters';
import { ROUTE_MOCK_DATA } from './route.mock-data';
import type { Route, RouteFormModel } from './route.model';

export interface RouteCreatePayload extends RouteFormModel {
  vehiclePlate: string;
  vehicleName: string;
}

@Injectable({ providedIn: 'root' })
export class UserRouteService {
  private readonly authService = inject(AuthService);
  private readonly companyVehicleService = inject(CompanyVehicleService);
  private readonly store: Route[] = structuredClone(ROUTE_MOCK_DATA);

  listMine(query: TableQuery): Observable<PaginatedResponse<Route>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => belongsToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query), query)).pipe(delay(200));
  }

  listAll(query: TableQuery): Observable<PaginatedResponse<Route>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => isExternalToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query), query)).pipe(delay(200));
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
    const display = this.companyVehicleService.getDisplay(payload.vehicleId);
    const item: Route = {
      id: crypto.randomUUID(),
      publishedAt: new Date().toISOString(),
      status: 'open',
      companyId: user.companyId,
      publisherId: user.id,
      ...payload,
      vehiclePlate: display.plate,
      vehicleName: display.name,
      vehicleType: display.vehicleType,
    };
    this.store.unshift(item);
    return of(structuredClone(item)).pipe(delay(250));
  }

  update(id: string, payload: RouteCreatePayload): Observable<Route> {
    const index = this.store.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Route not found: ${id}`)).pipe(delay(150));
    }

    const display = this.companyVehicleService.getDisplay(payload.vehicleId);
    const updated: Route = {
      ...this.store[index],
      ...payload,
      vehiclePlate: display.plate,
      vehicleName: display.name,
      vehicleType: display.vehicleType,
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

  private applyQuery(items: Route[], query: TableQuery): Route[] {
    let result = applyTableFilters(items, query, ROUTE_TABLE_FILTERS);

    if (query.sortField && query.sortDirection) {
      result = [...result].sort((left, right) => {
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
