import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import type { TableQuery } from '../../../../../shared/table/table.types';
import { UserCargoService } from '../../cargo/data/cargo.service';
import { UserRouteService } from '../../routes/data/route.service';
import { UserStorageService } from '../../storage/data/storage.service';

export interface UserDashboardCounts {
  routes: number;
  cargo: number;
  storage: number;
}

const COUNT_QUERY: TableQuery = {
  page: 1,
  pageSize: 1,
  filters: {},
  sortField: null,
  sortDirection: null,
};

@Injectable({ providedIn: 'root' })
export class UserDashboardService {
  private readonly routeService = inject(UserRouteService);
  private readonly cargoService = inject(UserCargoService);
  private readonly storageService = inject(UserStorageService);

  getCounts(): Observable<UserDashboardCounts> {
    return forkJoin({
      routes: this.routeService.listMine(COUNT_QUERY).pipe(map((response) => response.total)),
      cargo: this.cargoService.listMine(COUNT_QUERY).pipe(map((response) => response.total)),
      storage: this.storageService.listMine(COUNT_QUERY).pipe(map((response) => response.total)),
    });
  }
}
