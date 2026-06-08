import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../../shared/table';

import type { Vehicle } from '../data/vehicle.model';
import { ADMIN_VEHICLES_API } from '../data/vehicle.constants';

export const VehicleTable = defineTable<Vehicle>()({
  endpoint: ADMIN_VEHICLES_API,
  titleKey: 'tables.adminVehicles.title',
  summaryKey: 'tables.common.showingSummary',
  entityKey: 'tables.adminVehicles.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'registarskaOznaka', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'registarskaOznaka',
      titleKey: 'tables.adminVehicles.columns.registarskaOznaka',
      sortable: true,
      width: '10rem',
      mobile: { primary: true },
    },
    {
      key: 'marka',
      titleKey: 'tables.adminVehicles.columns.marka',
      sortable: true,
      width: '140px',
    },
    {
      key: 'komercijalnaOznaka',
      titleKey: 'tables.adminVehicles.columns.komercijalnaOznaka',
      sortable: true,
      width: '140px',
    },
    {
      key: 'brojSasije',
      titleKey: 'tables.adminVehicles.columns.brojSasije',
      sortable: true,
      width: '180px',
    },
    {
      key: 'vrstaVozila',
      titleKey: 'tables.adminVehicles.columns.vrstaVozila',
      sortable: true,
      cell: 'custom',
    },
    {
      key: 'vazenjeRegistracije',
      titleKey: 'tables.adminVehicles.columns.vazenjeRegistracije',
      sortable: true,
      format: 'date',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      { id: 'edit', labelKey: 'tables.adminVehicles.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'tables.adminVehicles.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'registarskaOznaka',
      type: 'search',
      titleKey: 'tables.adminVehicles.filters.search',
      placeholderKey: 'tables.adminVehicles.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['registarskaOznaka', 'brojSasije', 'marka', 'komercijalnaOznaka'],
    },
    {
      key: 'vrstaVozila',
      type: 'select',
      titleKey: 'tables.adminVehicles.filters.vrstaVozila',
      placeholderKey: 'tables.adminVehicles.filters.allVrste',
      options: [
        { value: 'putnicko', labelKey: 'forms.adminVehicle.vrstaVozila.putnicko' },
        { value: 'teretno', labelKey: 'forms.adminVehicle.vrstaVozila.teretno' },
        { value: 'motocikl', labelKey: 'forms.adminVehicle.vrstaVozila.motocikl' },
        { value: 'autobus', labelKey: 'forms.adminVehicle.vrstaVozila.autobus' },
        { value: 'prikljucno', labelKey: 'forms.adminVehicle.vrstaVozila.prikljucno' },
        { value: 'radno', labelKey: 'forms.adminVehicle.vrstaVozila.radno' },
      ],
    },
  ],
});
