import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_ROUTES_API } from '../data/route.constants';
import {
  ROUTE_MY_FILTER_STORAGE_KEY,
  ROUTE_TABLE_FILTERS,
} from '../data/route-table-filters';
import type { Route } from '../data/route.model';

export const RouteMyTable = defineTable<Route>()({
  endpoint: USER_ROUTES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.routes.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'transportStartDate', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: ROUTE_MY_FILTER_STORAGE_KEY,
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
      { id: 'edit', labelKey: 'portal.user.features.routes.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.user.features.routes.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: ROUTE_TABLE_FILTERS,
});

export const routeMyCellKey = tableCellKey(RouteMyTable, 'origin');
export const routeMyStatusCellKey = tableCellKey(RouteMyTable, 'status');
export const routeMyVehicleCellKey = tableCellKey(RouteMyTable, 'vehiclePlate');
export const routeMyVehicleTypeCellKey = tableCellKey(RouteMyTable, 'vehicleType');
export const routeMyPeriodCellKey = tableCellKey(RouteMyTable, 'transportStartDate');
