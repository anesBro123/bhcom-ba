import { LucideEye, LucideSend } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_CARGO_API } from '../data/cargo.constants';
import {
  CARGO_ALL_FILTER_STORAGE_KEY,
  CARGO_TABLE_FILTERS,
} from '../data/cargo-table-filters';
import type { Cargo } from '../data/cargo.model';

export const CargoAllTable = defineTable<Cargo>()({
  endpoint: USER_CARGO_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.cargo.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'neededByDate', direction: 'desc' },
  trackBy: 'id',
  filterStorageKey: CARGO_ALL_FILTER_STORAGE_KEY,
  columns: [
    {
      key: 'origin',
      titleKey: 'portal.user.features.cargo.table.columns.route',
      sortable: true,
      cell: 'custom',
      width: '18rem',
      mobile: { primary: true },
    },
    {
      key: 'status',
      titleKey: 'portal.user.features.cargo.table.columns.status',
      sortable: true,
      cell: 'custom',
      width: '8rem',
    },
    {
      key: 'cargoType',
      titleKey: 'portal.user.features.cargo.table.columns.cargoType',
      sortable: true,
      cell: 'custom',
      width: '9rem',
    },
    {
      key: 'size',
      titleKey: 'portal.user.features.cargo.table.columns.size',
      sortable: true,
      cell: 'custom',
      width: '7rem',
    },
    {
      key: 'weightKg',
      titleKey: 'portal.user.features.cargo.table.columns.weightKg',
      sortable: true,
      width: '6.5rem',
    },
    {
      key: 'neededByDate',
      titleKey: 'portal.user.features.cargo.table.columns.neededByDate',
      sortable: true,
      cell: 'custom',
      width: '9.5rem',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.user.features.cargo.table.actions.viewDetails',
        icon: LucideEye,
      },
      {
        id: 'sendRequest',
        labelKey: 'portal.user.features.cargo.table.actions.sendRequest',
        icon: LucideSend,
      },
    ],
  },
  filters: CARGO_TABLE_FILTERS,
});

export const cargoAllTypeCellKey = tableCellKey(CargoAllTable, 'cargoType');
export const cargoAllRouteCellKey = tableCellKey(CargoAllTable, 'origin');
export const cargoAllStatusCellKey = tableCellKey(CargoAllTable, 'status');
export const cargoAllSizeCellKey = tableCellKey(CargoAllTable, 'size');
export const cargoAllNeededByDateCellKey = tableCellKey(CargoAllTable, 'neededByDate');
