import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../../shared/table';

import type { Warehouse } from '../data/warehouse.model';
import { ADMIN_WAREHOUSES_API, WAREHOUSE_TYPE_OPTIONS } from '../data/warehouse.constants';

export const WarehouseTable = defineTable<Warehouse>()({
  endpoint: ADMIN_WAREHOUSES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.warehouses.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'name', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'name',
      titleKey: 'portal.admin.features.warehouses.table.columns.name',
      sortable: true,
      width: '200px',
      mobile: { primary: true },
    },
    {
      key: 'city',
      titleKey: 'portal.admin.features.warehouses.table.columns.city',
      sortable: true,
      width: '140px',
    },
    {
      key: 'capacityM2',
      titleKey: 'portal.admin.features.warehouses.table.columns.capacityM2',
      sortable: true,
      width: '120px',
    },
    {
      key: 'type',
      titleKey: 'portal.admin.features.warehouses.table.columns.type',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'floorCount',
      titleKey: 'portal.admin.features.warehouses.table.columns.floorCount',
      sortable: true,
      width: '100px',
    },
    {
      key: 'rackCount',
      titleKey: 'portal.admin.features.warehouses.table.columns.rackCount',
      sortable: true,
      width: '100px',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      { id: 'edit', labelKey: 'portal.admin.features.warehouses.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.warehouses.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'name',
      type: 'search',
      titleKey: 'portal.admin.features.warehouses.table.filters.search',
      placeholderKey: 'portal.admin.features.warehouses.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['name', 'address', 'city', 'country'],
    },
    {
      key: 'type',
      type: 'select',
      titleKey: 'portal.admin.features.warehouses.table.filters.type',
      placeholderKey: 'portal.admin.features.warehouses.table.filters.allTypes',
      options: [...WAREHOUSE_TYPE_OPTIONS],
    },
  ],
});
