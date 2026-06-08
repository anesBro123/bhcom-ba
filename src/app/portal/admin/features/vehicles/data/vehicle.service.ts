import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import type { FilterDef, PaginatedResponse, TableQuery } from '../../../../../shared/table/table.types';

import { VEHICLE_MOCK_DATA } from './vehicle.mock-data';
import type { Vehicle, VehicleFormModel } from './vehicle.model';
import { VehicleTable } from '../table/vehicle.table';

@Injectable({ providedIn: 'root' })
export class AdminVehicleService {
  private readonly store: Vehicle[] = structuredClone(VEHICLE_MOCK_DATA);

  list(query: TableQuery): Observable<PaginatedResponse<Vehicle>> {
    return of(this.paginate(this.applyQuery([...this.store], query), query)).pipe(delay(200));
  }

  getById(id: string): Observable<Vehicle> {
    const vehicle = this.store.find((item) => item.id === id);
    if (!vehicle) {
      return throwError(() => new Error(`Vehicle not found: ${id}`)).pipe(delay(150));
    }

    return of(structuredClone(vehicle)).pipe(delay(150));
  }

  create(payload: VehicleFormModel): Observable<Vehicle> {
    const vehicle: Vehicle = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.store.unshift(vehicle);
    return of(structuredClone(vehicle)).pipe(delay(250));
  }

  update(id: string, payload: VehicleFormModel): Observable<Vehicle> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Vehicle not found: ${id}`)).pipe(delay(150));
    }

    const updated: Vehicle = { id, ...payload };
    this.store[index] = updated;
    return of(structuredClone(updated)).pipe(delay(250));
  }

  delete(id: string): Observable<void> {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Vehicle not found: ${id}`)).pipe(delay(150));
    }

    this.store.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  private applyQuery(items: Vehicle[], query: TableQuery): Vehicle[] {
    let result = items;
    const filters = VehicleTable.filters as FilterDef<Vehicle>[] | undefined;

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

  private paginate(items: Vehicle[], query: TableQuery): PaginatedResponse<Vehicle> {
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
