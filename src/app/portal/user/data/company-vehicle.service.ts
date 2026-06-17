import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import type { SelectOption } from '../../../shared/form/form.types';

import { COMPANY_VEHICLE_MOCK_DATA } from './company-vehicle.mock-data';
import type { CompanyVehicle } from './company-vehicle.model';

@Injectable({ providedIn: 'root' })
export class CompanyVehicleService {
  private readonly store: CompanyVehicle[] = structuredClone(COMPANY_VEHICLE_MOCK_DATA);

  list(): Observable<CompanyVehicle[]> {
    return of(structuredClone(this.store)).pipe(delay(100));
  }

  listForSelect(): Observable<SelectOption[]> {
    return this.list().pipe(
      map((vehicles) =>
        vehicles.map((vehicle) => ({
          value: vehicle.id,
          label: `${vehicle.plate} — ${vehicle.make} ${vehicle.model}`,
        })),
      ),
    );
  }

  getLabel(id: string): string {
    const vehicle = this.store.find((item) => item.id === id);
    if (!vehicle) {
      return id;
    }

    return `${vehicle.plate} — ${vehicle.make} ${vehicle.model}`;
  }
}
