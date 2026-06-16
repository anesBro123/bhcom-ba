import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import type { TableQuery } from '../../../../../shared/table/table.types';
import { AdminUserService } from '../../users/data/user.service';
import { AdminVehicleService } from '../../vehicles/data/vehicle.service';
import { AdminWarehouseService } from '../../warehouses/data/warehouse.service';

export interface AdminDashboardCounts {
  users: number;
  vehicles: number;
  warehouses: number;
}

const COUNT_QUERY: TableQuery = {
  page: 1,
  pageSize: 1,
  filters: {},
  sortField: null,
  sortDirection: null,
};

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private readonly userService = inject(AdminUserService);
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly warehouseService = inject(AdminWarehouseService);

  getCounts(): Observable<AdminDashboardCounts> {
    return forkJoin({
      users: this.userService.list(COUNT_QUERY).pipe(map((response) => response.total)),
      vehicles: this.vehicleService.list(COUNT_QUERY).pipe(map((response) => response.total)),
      warehouses: this.warehouseService.list(COUNT_QUERY).pipe(map((response) => response.total)),
    });
  }
}
