import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../../shared/table';
import { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';

import type { Vehicle } from '../data/vehicle.model';
import { ADMIN_VEHICLES_API } from '../data/vehicle.constants';

export const VehicleTable = defineTable<Vehicle>()({
  endpoint: ADMIN_VEHICLES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.vehicles.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'registarskaOznaka', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'registarskaOznaka',
      titleKey: 'portal.admin.features.vehicles.table.columns.registarskaOznaka',
      sortable: true,
      width: '10rem',
      mobile: { primary: true },
    },
    {
      key: 'marka',
      titleKey: 'portal.admin.features.vehicles.table.columns.marka',
      sortable: true,
      width: '140px',
    },
    {
      key: 'komercijalnaOznaka',
      titleKey: 'portal.admin.features.vehicles.table.columns.komercijalnaOznaka',
      sortable: true,
      width: '140px',
    },
    {
      key: 'brojSasije',
      titleKey: 'portal.admin.features.vehicles.table.columns.brojSasije',
      sortable: true,
      width: '180px',
    },
    {
      key: 'vehicleType',
      titleKey: 'portal.admin.features.vehicles.table.columns.vehicleType',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'vazenjeRegistracije',
      titleKey: 'portal.admin.features.vehicles.table.columns.vazenjeRegistracije',
      sortable: true,
      format: 'date',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      { id: 'edit', labelKey: 'portal.admin.features.vehicles.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.vehicles.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'registarskaOznaka',
      type: 'search',
      titleKey: 'portal.admin.features.vehicles.table.filters.search',
      placeholderKey: 'portal.admin.features.vehicles.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['registarskaOznaka', 'brojSasije', 'marka', 'komercijalnaOznaka'],
    },
    {
      key: 'vehicleType',
      type: 'select',
      titleKey: 'portal.admin.features.vehicles.table.filters.vehicleType',
      placeholderKey: 'portal.admin.features.vehicles.table.filters.allTypes',
      options: [...VEHICLE_TYPE_OPTIONS],
    },
  ],
});
