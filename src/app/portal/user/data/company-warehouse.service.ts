import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import type { SelectOption } from '../../../shared/form/form.types';

import { COMPANY_WAREHOUSE_MOCK_DATA } from './company-warehouse.mock-data';
import type { CompanyWarehouse } from './company-warehouse.model';

@Injectable({ providedIn: 'root' })
export class CompanyWarehouseService {
  private readonly store: CompanyWarehouse[] = structuredClone(COMPANY_WAREHOUSE_MOCK_DATA);

  list(): Observable<CompanyWarehouse[]> {
    return of(structuredClone(this.store)).pipe(delay(100));
  }

  listForSelect(): Observable<SelectOption[]> {
    return this.list().pipe(
      map((warehouses) =>
        warehouses.map((warehouse) => ({
          value: warehouse.id,
          label: `${warehouse.name} — ${warehouse.city}`,
        })),
      ),
    );
  }

  getLabel(id: string): string {
    const warehouse = this.store.find((item) => item.id === id);
    if (!warehouse) {
      return id;
    }

    return `${warehouse.name} — ${warehouse.city}`;
  }
}
