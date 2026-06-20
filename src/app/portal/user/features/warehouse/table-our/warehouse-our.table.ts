import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_WAREHOUSE_API } from '../data/warehouse.constants';
import {
  WAREHOUSE_OUR_FILTER_STORAGE_KEY,
  WAREHOUSE_TABLE_FILTERS,
} from '../data/warehouse-table-filters';
import type { Warehouse } from '../data/warehouse.model';

export const WarehouseOurTable = defineTable<Warehouse>()({
  endpoint: USER_WAREHOUSE_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.warehouse.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'availableFrom', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: WAREHOUSE_OUR_FILTER_STORAGE_KEY,
  columns: [
    {
      key: 'warehouseLabel',
      titleKey: 'portal.user.features.warehouse.table.columns.warehouse',
      sortable: true,
      cell: 'custom',
      mobile: { primary: true },
    },
    {
      key: 'status',
      titleKey: 'portal.user.features.warehouse.table.columns.status',
      sortable: true,
      cell: 'custom',
      width: '9rem',
    },
    {
      key: 'availableFrom',
      titleKey: 'portal.user.features.warehouse.table.columns.period',
      sortable: true,
      cell: 'custom',
      width: '18rem',
    },
    {
      key: 'spaceM2',
      titleKey: 'portal.user.features.warehouse.table.columns.spaceM2',
      sortable: true,
    },
    {
      key: 'description',
      titleKey: 'portal.user.features.warehouse.table.columns.description',
      sortable: false,
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.user.features.warehouse.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.user.features.warehouse.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.user.features.warehouse.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: WAREHOUSE_TABLE_FILTERS,
});

export const warehouseOurStatusCellKey = tableCellKey(WarehouseOurTable, 'status');
export const warehouseOurWarehouseCellKey = tableCellKey(WarehouseOurTable, 'warehouseLabel');
export const warehouseOurPeriodCellKey = tableCellKey(WarehouseOurTable, 'availableFrom');
