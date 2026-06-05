import { LucideCopy, LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../shared/table';

import type { Shipment } from './shipment.model';

export const ShipmentTable = defineTable<Shipment>()({
  endpoint: '/api/shipments',
  titleKey: 'tables.shipments.title',
  summaryKey: 'tables.common.showingSummary',
  entityKey: 'tables.shipments.entity',
  defaultPageSize: 5,
  defaultSort: { field: 'id', direction: 'asc' },
  selectable: true,
  trackBy: 'id',
  columns: [
    {
      key: 'id',
      titleKey: 'tables.shipments.columns.id',
      sortable: true,
      width: '8rem',
      cell: 'custom',
      mobile: { primary: true },
    },
    { key: 'customer', titleKey: 'tables.shipments.columns.customer', sortable: true, width: '140px' },
    { key: 'origin', titleKey: 'tables.shipments.columns.origin', sortable: true, width: '160px' },
    { key: 'destination', titleKey: 'tables.shipments.columns.destination', sortable: true, width: '160px' },
    {
      key: 'departure',
      titleKey: 'tables.shipments.columns.departure',
      sortable: true,
      format: 'date',
    },
    { key: 'eta', titleKey: 'tables.shipments.columns.eta', sortable: true, format: 'date' },
    {
      key: 'status',
      titleKey: 'tables.shipments.columns.status',
      sortable: true,
      cell: 'custom',
    },
    { key: 'type', titleKey: 'tables.shipments.columns.type', sortable: true, cell: 'custom' },
    {
      key: 'priority',
      titleKey: 'tables.shipments.columns.priority',
      sortable: true,
      cell: 'custom',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      { id: 'view', labelKey: 'tables.shipments.actions.view', icon: LucideEye },
      { id: 'edit', labelKey: 'tables.shipments.actions.edit', icon: LucidePencil },
      { id: 'duplicate', labelKey: 'tables.shipments.actions.duplicate', icon: LucideCopy },
      {
        id: 'delete',
        labelKey: 'tables.shipments.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'customer',
      type: 'search',
      titleKey: 'tables.shipments.filters.search',
      placeholderKey: 'tables.shipments.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['id', 'customer', 'trackingNumber'],
    },
    {
      key: 'status',
      type: 'select',
      titleKey: 'tables.shipments.filters.status',
      placeholderKey: 'tables.shipments.filters.allStatuses',
      options: [
        { value: 'in_transit', labelKey: 'tables.shipments.status.in_transit' },
        { value: 'pending', labelKey: 'tables.shipments.status.pending' },
        { value: 'delivered', labelKey: 'tables.shipments.status.delivered' },
      ],
    },
    {
      key: 'type',
      type: 'select',
      titleKey: 'tables.shipments.filters.type',
      placeholderKey: 'tables.shipments.filters.allTypes',
      options: [
        { value: 'road', labelKey: 'tables.shipments.type.road' },
        { value: 'air', labelKey: 'tables.shipments.type.air' },
        { value: 'sea', labelKey: 'tables.shipments.type.sea' },
      ],
    },
    {
      key: 'priority',
      type: 'select',
      titleKey: 'tables.shipments.filters.priority',
      placeholderKey: 'tables.shipments.filters.allPriorities',
      options: [
        { value: 'standard', labelKey: 'tables.shipments.priority.standard' },
        { value: 'express', labelKey: 'tables.shipments.priority.express' },
        { value: 'economy', labelKey: 'tables.shipments.priority.economy' },
      ],
    },
  ],
});
