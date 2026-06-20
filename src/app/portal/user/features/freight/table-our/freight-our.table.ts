import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_FREIGHT_API } from '../data/freight.constants';
import {
  FREIGHT_OUR_FILTER_STORAGE_KEY,
  FREIGHT_TABLE_FILTERS,
} from '../data/freight-table-filters';
import type { Freight } from '../data/freight.model';

export const FreightOurTable = defineTable<Freight>()({
  endpoint: USER_FREIGHT_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.freight.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'neededByDate', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: FREIGHT_OUR_FILTER_STORAGE_KEY,
  columns: [
    {
      key: 'origin',
      titleKey: 'portal.user.features.freight.table.columns.route',
      sortable: true,
      cell: 'custom',
      width: '18rem',
      mobile: { primary: true },
    },
    {
      key: 'status',
      titleKey: 'portal.user.features.freight.table.columns.status',
      sortable: true,
      cell: 'custom',
      width: '9rem',
    },
    {
      key: 'freightType',
      titleKey: 'portal.user.features.freight.table.columns.freightType',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'size',
      titleKey: 'portal.user.features.freight.table.columns.size',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'weightKg',
      titleKey: 'portal.user.features.freight.table.columns.weightKg',
      sortable: true,
    },
    {
      key: 'neededByDate',
      titleKey: 'portal.user.features.freight.table.columns.neededByDate',
      sortable: true,
      cell: 'custom',
      width: '12rem',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.user.features.freight.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.user.features.freight.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.user.features.freight.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: FREIGHT_TABLE_FILTERS,
});

export const freightOurTypeCellKey = tableCellKey(FreightOurTable, 'freightType');
export const freightOurRouteCellKey = tableCellKey(FreightOurTable, 'origin');
export const freightOurStatusCellKey = tableCellKey(FreightOurTable, 'status');
export const freightOurSizeCellKey = tableCellKey(FreightOurTable, 'size');
export const freightOurNeededByDateCellKey = tableCellKey(FreightOurTable, 'neededByDate');
