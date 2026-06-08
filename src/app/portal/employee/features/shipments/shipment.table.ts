import { LucideCopy, LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../shared/table';

import type { Shipment } from './shipment.model';

export const ShipmentTable = defineTable<Shipment>()({
  endpoint: '/api/shipments',
  titleKey: 'portal.employee.features.shipments.table.title',
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.employee.features.shipments.table.entity',
  defaultPageSize: 5,
  defaultSort: { field: 'id', direction: 'asc' },
  selectable: true,
  trackBy: 'id',
  columns: [
    {
      key: 'id',
      titleKey: 'portal.employee.features.shipments.table.columns.id',
      sortable: true,
      width: '8rem',
      cell: 'custom',
      mobile: { primary: true },
    },
    { key: 'customer', titleKey: 'portal.employee.features.shipments.table.columns.customer', sortable: true, width: '140px' },
    { key: 'origin', titleKey: 'portal.employee.features.shipments.table.columns.origin', sortable: true, width: '160px' },
    { key: 'destination', titleKey: 'portal.employee.features.shipments.table.columns.destination', sortable: true, width: '160px' },
    {
      key: 'departure',
      titleKey: 'portal.employee.features.shipments.table.columns.departure',
      sortable: true,
      format: 'date',
    },
    { key: 'eta', titleKey: 'portal.employee.features.shipments.table.columns.eta', sortable: true, format: 'date' },
    {
      key: 'status',
      titleKey: 'portal.employee.features.shipments.table.columns.status',
      sortable: true,
      cell: 'custom',
    },
    { key: 'type', titleKey: 'portal.employee.features.shipments.table.columns.type', sortable: true, cell: 'custom' },
    {
      key: 'priority',
      titleKey: 'portal.employee.features.shipments.table.columns.priority',
      sortable: true,
      cell: 'custom',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      { id: 'view', labelKey: 'portal.employee.features.shipments.table.actions.view', icon: LucideEye },
      { id: 'edit', labelKey: 'portal.employee.features.shipments.table.actions.edit', icon: LucidePencil },
      { id: 'duplicate', labelKey: 'portal.employee.features.shipments.table.actions.duplicate', icon: LucideCopy },
      {
        id: 'delete',
        labelKey: 'portal.employee.features.shipments.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'customer',
      type: 'search',
      titleKey: 'portal.employee.features.shipments.table.filters.search',
      placeholderKey: 'portal.employee.features.shipments.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['id', 'customer', 'trackingNumber'],
    },
    {
      key: 'status',
      type: 'select',
      titleKey: 'portal.employee.features.shipments.table.filters.status',
      placeholderKey: 'portal.employee.features.shipments.table.filters.allStatuses',
      options: [
        { value: 'in_transit', labelKey: 'portal.employee.features.shipments.table.status.in_transit' },
        { value: 'pending', labelKey: 'portal.employee.features.shipments.table.status.pending' },
        { value: 'delivered', labelKey: 'portal.employee.features.shipments.table.status.delivered' },
      ],
    },
    {
      key: 'type',
      type: 'select',
      titleKey: 'portal.employee.features.shipments.table.filters.type',
      placeholderKey: 'portal.employee.features.shipments.table.filters.allTypes',
      options: [
        { value: 'road', labelKey: 'portal.employee.features.shipments.table.type.road' },
        { value: 'air', labelKey: 'portal.employee.features.shipments.table.type.air' },
        { value: 'sea', labelKey: 'portal.employee.features.shipments.table.type.sea' },
      ],
    },
    {
      key: 'priority',
      type: 'select',
      titleKey: 'portal.employee.features.shipments.table.filters.priority',
      placeholderKey: 'portal.employee.features.shipments.table.filters.allPriorities',
      options: [
        { value: 'standard', labelKey: 'portal.employee.features.shipments.table.priority.standard' },
        { value: 'express', labelKey: 'portal.employee.features.shipments.table.priority.express' },
        { value: 'economy', labelKey: 'portal.employee.features.shipments.table.priority.economy' },
      ],
    },
  ],
});
