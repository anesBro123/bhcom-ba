import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import type { TableQuery } from '../../../../../shared/table/table.types';
import { UserFreightService } from '../../freight/data/freight.service';
import { UserTransportService } from '../../transport/data/transport.service';
import { UserWarehouseService } from '../../warehouse/data/warehouse.service';

export interface HomeCounts {
  transport: number;
  freight: number;
  warehouse: number;
  openTotal: number;
  expiringSoon: number;
}

const COUNT_QUERY: TableQuery = {
  page: 1,
  pageSize: 1,
  sortField: null,
  sortDirection: null,
  filters: {},
};

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly transportService = inject(UserTransportService);
  private readonly freightService = inject(UserFreightService);
  private readonly warehouseService = inject(UserWarehouseService);

  getSnapshot(): Observable<HomeCounts> {
    return forkJoin({
      transport: this.transportService.listOurs(COUNT_QUERY).pipe(map((response) => response.total)),
      freight: this.freightService.listOurs(COUNT_QUERY).pipe(map((response) => response.total)),
      warehouse: this.warehouseService.listOurs(COUNT_QUERY).pipe(map((response) => response.total)),
    }).pipe(
      map(({ transport, freight, warehouse }) => ({
        transport,
        freight,
        warehouse,
        openTotal: transport + freight + warehouse,
        expiringSoon: 0,
      })),
    );
  }
}
