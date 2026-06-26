import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import type { Vehicle } from '../data/vehicle.model';
import { ADMIN_VEHICLES_API } from '../data/vehicle.constants';
import { VEHICLE_FILTER_STORAGE_KEY, VEHICLE_TABLE_FILTERS } from '../data/vehicle-table-filters';

export const VehicleTable = defineTable<Vehicle>()({
  endpoint: ADMIN_VEHICLES_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.vehicles.table.entity',
  filterStorageKey: VEHICLE_FILTER_STORAGE_KEY,
  defaultPageSize: 10,
  defaultSort: { field: 'registarskaOznaka', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'marka',
      titleKey: 'portal.admin.features.vehicles.table.columns.vehicle',
      sortable: true,
      cell: 'custom',
      width: '14rem',
      mobile: { primary: true },
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
      {
        id: 'viewDetails',
        labelKey: 'portal.admin.features.vehicles.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.admin.features.vehicles.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.vehicles.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: VEHICLE_TABLE_FILTERS,
});

export const vehicleDisplayCellKey = tableCellKey(VehicleTable, 'marka');
export const vehicleTypeCellKey = tableCellKey(VehicleTable, 'vehicleType');
