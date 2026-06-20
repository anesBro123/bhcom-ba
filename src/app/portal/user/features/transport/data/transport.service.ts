import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { AuthService } from '../../../../../shared/core/auth/auth.service';
import { belongsToCompany, isExternalToCompany } from '../../../../../shared/constants/user-list-scope';
import { applyTableFilters } from '../../../../../shared/table/apply-table-filters';
import type { PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';
import { CompanyVehicleService } from '../../../data/company-vehicle.service';

import { TRANSPORT_TABLE_FILTERS } from './transport-table-filters';
import { TRANSPORT_MOCK_DATA } from './transport.mock-data';
import type { Transport, TransportFormModel } from './transport.model';

export interface TransportCreatePayload extends TransportFormModel {
  vehiclePlate: string;
  vehicleName: string;
}

@Injectable({ providedIn: 'root' })
export class UserTransportService {
  private readonly authService = inject(AuthService);
  private readonly companyVehicleService = inject(CompanyVehicleService);
  private readonly store: Transport[] = structuredClone(TRANSPORT_MOCK_DATA);

  listOurs(query: TableQuery): Observable<PaginatedResponse<Transport>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => belongsToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query), query)).pipe(delay(200));
  }

  listAll(query: TableQuery): Observable<PaginatedResponse<Transport>> {
    const companyId = this.authService.user()!.companyId;
    const scoped = this.store.filter((item) => isExternalToCompany(item, companyId));
    return of(this.paginate(this.applyQuery([...scoped], query), query)).pipe(delay(200));
  }

  getById(id: string): Observable<Transport> {
    const item = this.store.find((entry) => entry.id === id);
    if (!item) {
      return throwError(() => new Error(`Transport not found: ${id}`)).pipe(delay(150));
    }

    return of(structuredClone(item)).pipe(delay(150));
  }

  create(payload: TransportCreatePayload): Observable<Transport> {
    const user = this.authService.user()!;
    const display = this.companyVehicleService.getDisplay(payload.vehicleId);
    const item: Transport = {
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

  update(id: string, payload: TransportCreatePayload): Observable<Transport> {
    const index = this.store.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Transport not found: ${id}`)).pipe(delay(150));
    }

    const display = this.companyVehicleService.getDisplay(payload.vehicleId);
    const updated: Transport = {
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
      return throwError(() => new Error(`Transport not found: ${id}`)).pipe(delay(150));
    }

    this.store.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  private applyQuery(items: Transport[], query: TableQuery): Transport[] {
    let result = applyTableFilters(items, query, TRANSPORT_TABLE_FILTERS);

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

  private paginate(items: Transport[], query: TableQuery): PaginatedResponse<Transport> {
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
