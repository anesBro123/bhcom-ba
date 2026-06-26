import { LucideEye, LucidePencil, LucideSend, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../shared/table';

import { USER_FREIGHT_API } from './data/freight.constants';
import {
  FREIGHT_ALL_FILTER_STORAGE_KEY,
  FREIGHT_OUR_FILTER_STORAGE_KEY,
  FREIGHT_TABLE_FILTERS,
} from './data/freight-table-filters';
import type { Freight } from './data/freight.model';

const FREIGHT_COLUMNS = [
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
    mobile: { header: true, hidden: true },
  },
  {
    key: 'freightType',
    titleKey: 'portal.user.features.freight.table.columns.freightType',
    sortable: true,
    cell: 'custom',
    width: '9rem',
  },
  {
    key: 'size',
    titleKey: 'portal.user.features.freight.table.columns.size',
    sortable: true,
    cell: 'custom',
    width: '7rem',
  },
  {
    key: 'weightKg',
    titleKey: 'portal.user.features.freight.table.columns.weightKg',
    sortable: true,
    width: '6.5rem',
  },
  {
    key: 'neededByDate',
    titleKey: 'portal.user.features.freight.table.columns.neededByDate',
    sortable: true,
    cell: 'custom',
    width: '9.5rem',
  },
] as const;

export type FreightTableScope = 'all' | 'our';

export function buildFreightTable(scope: FreightTableScope) {
  const isOur = scope === 'our';

  return defineTable<Freight>()({
    endpoint: USER_FREIGHT_API,
    summaryKey: 'shared.table.common.showingSummary',
    entityKey: 'portal.user.features.freight.table.entity',
    defaultPageSize: 10,
    defaultSort: { field: 'neededByDate', direction: 'desc' },
    trackBy: 'id',
    filterStorageKey: isOur ? FREIGHT_OUR_FILTER_STORAGE_KEY : FREIGHT_ALL_FILTER_STORAGE_KEY,
    columns: [...FREIGHT_COLUMNS],
    actions: {
      width: '3.5rem',
      items: isOur
        ? [
            {
              id: 'viewDetails',
              labelKey: 'portal.user.features.freight.table.actions.viewDetails',
              icon: LucideEye,
            },
            {
              id: 'edit',
              labelKey: 'portal.user.features.freight.table.actions.edit',
              icon: LucidePencil,
            },
            {
              id: 'delete',
              labelKey: 'portal.user.features.freight.table.actions.delete',
              icon: LucideTrash,
              danger: true,
            },
          ]
        : [
            {
              id: 'viewDetails',
              labelKey: 'portal.user.features.freight.table.actions.viewDetails',
              icon: LucideEye,
            },
            {
              id: 'sendRequest',
              labelKey: 'portal.user.features.freight.table.actions.sendRequest',
              icon: LucideSend,
            },
          ],
    },
    filters: FREIGHT_TABLE_FILTERS,
  });
}

export const FreightAllTable = buildFreightTable('all');
export const FreightOurTable = buildFreightTable('our');

export const freightAllTypeCellKey = tableCellKey(FreightAllTable, 'freightType');
export const freightAllRouteCellKey = tableCellKey(FreightAllTable, 'origin');
export const freightAllStatusCellKey = tableCellKey(FreightAllTable, 'status');
export const freightAllSizeCellKey = tableCellKey(FreightAllTable, 'size');
export const freightAllNeededByDateCellKey = tableCellKey(FreightAllTable, 'neededByDate');

export const freightOurTypeCellKey = tableCellKey(FreightOurTable, 'freightType');
export const freightOurRouteCellKey = tableCellKey(FreightOurTable, 'origin');
export const freightOurStatusCellKey = tableCellKey(FreightOurTable, 'status');
export const freightOurSizeCellKey = tableCellKey(FreightOurTable, 'size');
export const freightOurNeededByDateCellKey = tableCellKey(FreightOurTable, 'neededByDate');
