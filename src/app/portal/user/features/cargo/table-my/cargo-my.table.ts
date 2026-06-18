import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_CARGO_API, CARGO_TYPE_OPTIONS } from '../data/cargo.constants';
import type { Cargo } from '../data/cargo.model';

export const CargoMyTable = defineTable<Cargo>()({
  endpoint: USER_CARGO_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.user.features.cargo.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'neededByDate', direction: 'desc' },
  trackBy: 'id',
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
      width: '9rem',
    },
    {
      key: 'cargoType',
      titleKey: 'portal.user.features.cargo.table.columns.cargoType',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'size',
      titleKey: 'portal.user.features.cargo.table.columns.size',
      sortable: true,
    },
    {
      key: 'weightKg',
      titleKey: 'portal.user.features.cargo.table.columns.weightKg',
      sortable: true,
    },
    {
      key: 'neededByDate',
      titleKey: 'portal.user.features.cargo.table.columns.neededByDate',
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
        labelKey: 'portal.user.features.cargo.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.user.features.cargo.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.user.features.cargo.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'origin',
      type: 'search',
      titleKey: 'portal.user.features.cargo.table.filters.search',
      placeholderKey: 'portal.user.features.cargo.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['origin', 'destination', 'size', 'description'],
    },
    {
      key: 'cargoType',
      type: 'select',
      titleKey: 'portal.user.features.cargo.table.filters.cargoType',
      placeholderKey: 'portal.user.features.cargo.table.filters.allTypes',
      options: [...CARGO_TYPE_OPTIONS],
    },
  ],
});

export const cargoMyTypeCellKey = tableCellKey(CargoMyTable, 'cargoType');
export const cargoMyRouteCellKey = tableCellKey(CargoMyTable, 'origin');
export const cargoMyStatusCellKey = tableCellKey(CargoMyTable, 'status');
export const cargoMyNeededByDateCellKey = tableCellKey(CargoMyTable, 'neededByDate');
