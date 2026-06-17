import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import { USER_CARGO_API, CARGO_TYPE_OPTIONS } from '../data/cargo.constants';
import type { Cargo } from '../data/cargo.model';

export const CargoTable = defineTable<Cargo>()({
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
      mobile: { primary: true },
    },
    {
      key: 'destination',
      titleKey: 'portal.user.features.cargo.table.columns.destination',
      sortable: true,
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
      format: 'date',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
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

export const cargoTypeCellKey = tableCellKey(CargoTable, 'cargoType');
export const cargoRouteCellKey = tableCellKey(CargoTable, 'origin');
