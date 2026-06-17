import { LucideEye, LucideSend } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_STORAGE_API } from '../data/storage.constants';
import type { Storage } from '../data/storage.model';

export const StorageAllTable = defineTable<Storage>()({
  endpoint: USER_STORAGE_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.storage.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'availableFrom', direction: 'desc' },
  trackBy: 'id',
  columns: [
    {
      key: 'warehouseLabel',
      titleKey: 'portal.user.features.storage.table.columns.warehouse',
      sortable: true,
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
      titleKey: 'portal.user.features.storage.table.columns.availableFrom',
      sortable: true,
      format: 'date',
    },
    {
      key: 'availableTo',
      titleKey: 'portal.user.features.storage.table.columns.availableTo',
      sortable: true,
      format: 'date',
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
      {
        id: 'sendRequest',
        labelKey: 'portal.user.features.storage.table.actions.sendRequest',
        icon: LucideSend,
      },
    ],
  },
  filters: [
    {
      key: 'warehouseLabel',
      type: 'search',
      titleKey: 'portal.user.features.storage.table.filters.search',
      placeholderKey: 'portal.user.features.storage.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['warehouseLabel', 'description'],
    },
  ],
});

export const storageAllStatusCellKey = tableCellKey(StorageAllTable, 'status');
