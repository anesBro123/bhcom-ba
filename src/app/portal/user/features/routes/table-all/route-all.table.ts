import { LucideEye, LucideSend } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_ROUTES_API } from '../data/route.constants';
import {
  ROUTE_ALL_FILTER_STORAGE_KEY,
  ROUTE_TABLE_FILTERS,
} from '../data/route-table-filters';
import type { Route } from '../data/route.model';

export const RouteAllTable = defineTable<Route>()({
  endpoint: USER_ROUTES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.routes.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'transportStartDate', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: ROUTE_ALL_FILTER_STORAGE_KEY,
  columns: [
    {
      key: 'origin',
      titleKey: 'portal.user.features.routes.table.columns.route',
      sortable: true,
      cell: 'custom',
      width: '18rem',
      mobile: { primary: true },
    },
    {
      key: 'status',
      titleKey: 'portal.user.features.routes.table.columns.status',
      sortable: true,
      cell: 'custom',
      width: '9rem',
    },
    {
      key: 'vehiclePlate',
      titleKey: 'portal.user.features.routes.table.columns.vehicle',
      sortable: true,
      cell: 'custom',
      width: '14rem',
    },
    {
      key: 'vehicleType',
      titleKey: 'portal.user.features.routes.table.columns.vehicleType',
      sortable: true,
      cell: 'custom',
      width: '11rem',
    },
    {
      key: 'transportStartDate',
      titleKey: 'portal.user.features.routes.table.columns.period',
      sortable: true,
      cell: 'custom',
      width: '18rem',
    },
    {
      key: 'description',
      titleKey: 'portal.user.features.routes.table.columns.description',
      sortable: false,
      width: '16rem',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.user.features.routes.table.actions.viewDetails',
        icon: LucideEye,
      },
      {
        id: 'sendRequest',
        labelKey: 'portal.user.features.routes.table.actions.sendRequest',
        icon: LucideSend,
      },
    ],
  },
  filters: ROUTE_TABLE_FILTERS,
});

export const routeAllCellKey = tableCellKey(RouteAllTable, 'origin');
export const routeAllStatusCellKey = tableCellKey(RouteAllTable, 'status');
export const routeAllVehicleCellKey = tableCellKey(RouteAllTable, 'vehiclePlate');
export const routeAllVehicleTypeCellKey = tableCellKey(RouteAllTable, 'vehicleType');
export const routeAllPeriodCellKey = tableCellKey(RouteAllTable, 'transportStartDate');
