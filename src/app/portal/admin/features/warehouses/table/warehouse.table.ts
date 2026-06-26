import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import type { Warehouse } from '../data/warehouse.model';
import { ADMIN_WAREHOUSES_API } from '../data/warehouse.constants';
import { WAREHOUSE_FILTER_STORAGE_KEY, WAREHOUSE_TABLE_FILTERS } from '../data/warehouse-table-filters';

export const WarehouseTable = defineTable<Warehouse>()({
  endpoint: ADMIN_WAREHOUSES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.warehouses.table.entity',
  filterStorageKey: WAREHOUSE_FILTER_STORAGE_KEY,
  defaultPageSize: 10,
  defaultSort: { field: 'name', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'name',
      titleKey: 'portal.admin.features.warehouses.table.columns.warehouse',
      sortable: true,
      cell: 'custom',
      width: '18rem',
      mobile: { primary: true },
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
      {
        id: 'viewDetails',
        labelKey: 'portal.admin.features.warehouses.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.admin.features.warehouses.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.warehouses.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: WAREHOUSE_TABLE_FILTERS,
});

export const warehouseDisplayCellKey = tableCellKey(WarehouseTable, 'name');
export const warehouseTypeCellKey = tableCellKey(WarehouseTable, 'type');
