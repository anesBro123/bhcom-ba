import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../../shared/table';

import { USER_ROUTES_API } from '../data/route.constants';
import type { Route } from '../data/route.model';

export const RouteTable = defineTable<Route>()({
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
      width: '12rem',
      mobile: { primary: true },
    },
    {
      key: 'destination',
      titleKey: 'portal.user.features.routes.table.columns.destination',
      sortable: true,
      width: '12rem',
    },
    {
      key: 'vehicleLabel',
      titleKey: 'portal.user.features.routes.table.columns.vehicle',
      sortable: true,
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
      searchFields: ['origin', 'destination', 'vehicleLabel', 'description'],
    },
  ],
});
