import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_STORAGE_API } from '../data/storage.constants';
import {
  STORAGE_MY_FILTER_STORAGE_KEY,
  STORAGE_TABLE_FILTERS,
} from '../data/storage-table-filters';
import type { Storage } from '../data/storage.model';

export const StorageMyTable = defineTable<Storage>()({
  endpoint: USER_STORAGE_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.storage.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'availableFrom', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: STORAGE_MY_FILTER_STORAGE_KEY,
  columns: [
    {
      key: 'warehouseLabel',
      titleKey: 'portal.user.features.storage.table.columns.warehouse',
      sortable: true,
      cell: 'custom',
      mobile: { primary: true },
    },
    {
      key: 'status',
      titleKey: 'portal.user.features.storage.table.columns.status',
      sortable: true,
      cell: 'custom',
      width: '9rem',
    },
    {
      key: 'availableFrom',
      titleKey: 'portal.user.features.storage.table.columns.period',
      sortable: true,
      cell: 'custom',
      width: '18rem',
    },
    {
      key: 'spaceM2',
      titleKey: 'portal.user.features.storage.table.columns.spaceM2',
      sortable: true,
    },
    {
      key: 'description',
      titleKey: 'portal.user.features.storage.table.columns.description',
      sortable: false,
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.user.features.storage.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.user.features.storage.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.user.features.storage.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: STORAGE_TABLE_FILTERS,
});

export const storageMyStatusCellKey = tableCellKey(StorageMyTable, 'status');
export const storageMyWarehouseCellKey = tableCellKey(StorageMyTable, 'warehouseLabel');
export const storageMyPeriodCellKey = tableCellKey(StorageMyTable, 'availableFrom');
