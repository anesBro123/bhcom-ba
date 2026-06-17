import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_ROUTES_API } from '../data/route.constants';
import type { Route } from '../data/route.model';

export const RouteMyTable = defineTable<Route>()({
  endpoint: USER_ROUTES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.routes.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'transportStartDate', direction: 'desc' },
  trackBy: 'id',
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
      key: 'transportStartDate',
      titleKey: 'portal.user.features.routes.table.columns.transportStartDate',
      sortable: true,
      format: 'date',
      width: '10rem',
    },
    {
      key: 'transportEndDate',
      titleKey: 'portal.user.features.routes.table.columns.transportEndDate',
      sortable: true,
      format: 'date',
      width: '10rem',
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
  filters: [
    {
      key: 'origin',
      type: 'search',
      titleKey: 'portal.user.features.routes.table.filters.search',
      placeholderKey: 'portal.user.features.routes.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['origin', 'destination', 'vehiclePlate', 'vehicleName', 'description'],
    },
  ],
});

export const routeMyCellKey = tableCellKey(RouteMyTable, 'origin');
export const routeMyStatusCellKey = tableCellKey(RouteMyTable, 'status');
export const routeMyVehicleCellKey = tableCellKey(RouteMyTable, 'vehiclePlate');
