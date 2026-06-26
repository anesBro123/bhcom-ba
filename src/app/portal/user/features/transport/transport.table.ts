import { LucideEye, LucidePencil, LucideSend, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../shared/table';

import { USER_TRANSPORT_API } from './data/transport.constants';
import {
  TRANSPORT_ALL_FILTER_STORAGE_KEY,
  TRANSPORT_OUR_FILTER_STORAGE_KEY,
  TRANSPORT_TABLE_FILTERS,
} from './data/transport-table-filters';
import type { Transport } from './data/transport.model';

const TRANSPORT_COLUMNS = [
  {
    key: 'origin',
    titleKey: 'portal.user.features.transport.table.columns.route',
    sortable: true,
    cell: 'custom',
    width: '18rem',
    mobile: { primary: true },
  },
  {
    key: 'status',
    titleKey: 'portal.user.features.transport.table.columns.status',
    sortable: true,
    cell: 'custom',
    width: '9rem',
    mobile: { header: true, hidden: true },
  },
  {
    key: 'vehiclePlate',
    titleKey: 'portal.user.features.transport.table.columns.vehicle',
    sortable: true,
    cell: 'custom',
    width: '14rem',
  },
  {
    key: 'vehicleType',
    titleKey: 'portal.user.features.transport.table.columns.vehicleType',
    sortable: true,
    cell: 'custom',
    width: '11rem',
  },
  {
    key: 'transportStartDate',
    titleKey: 'portal.user.features.transport.table.columns.period',
    sortable: true,
    cell: 'custom',
    width: '18rem',
  },
  {
    key: 'description',
    titleKey: 'portal.user.features.transport.table.columns.description',
    sortable: false,
    width: '16rem',
  },
] as const;

export type TransportTableScope = 'all' | 'our';

export function buildTransportTable(scope: TransportTableScope) {
  const isOur = scope === 'our';

  return defineTable<Transport>()({
    endpoint: USER_TRANSPORT_API,
    summaryKey: 'shared.table.common.showingSummary',
    entityKey: 'portal.user.features.transport.table.entity',
    defaultPageSize: 10,
    defaultSort: { field: 'transportStartDate', direction: 'desc' },
    trackBy: 'id',
    filterStorageKey: isOur ? TRANSPORT_OUR_FILTER_STORAGE_KEY : TRANSPORT_ALL_FILTER_STORAGE_KEY,
    columns: [...TRANSPORT_COLUMNS],
    actions: {
      width: '3.5rem',
      items: isOur
        ? [
            {
              id: 'viewDetails',
              labelKey: 'portal.user.features.transport.table.actions.viewDetails',
              icon: LucideEye,
            },
            {
              id: 'edit',
              labelKey: 'portal.user.features.transport.table.actions.edit',
              icon: LucidePencil,
            },
            {
              id: 'delete',
              labelKey: 'portal.user.features.transport.table.actions.delete',
              icon: LucideTrash,
              danger: true,
            },
          ]
        : [
            {
              id: 'viewDetails',
              labelKey: 'portal.user.features.transport.table.actions.viewDetails',
              icon: LucideEye,
            },
            {
              id: 'sendRequest',
              labelKey: 'portal.user.features.transport.table.actions.sendRequest',
              icon: LucideSend,
            },
          ],
    },
    filters: TRANSPORT_TABLE_FILTERS,
  });
}

export const TransportAllTable = buildTransportTable('all');
export const TransportOurTable = buildTransportTable('our');

export const transportAllCellKey = tableCellKey(TransportAllTable, 'origin');
export const transportAllStatusCellKey = tableCellKey(TransportAllTable, 'status');
export const transportAllVehicleCellKey = tableCellKey(TransportAllTable, 'vehiclePlate');
export const transportAllVehicleTypeCellKey = tableCellKey(TransportAllTable, 'vehicleType');
export const transportAllPeriodCellKey = tableCellKey(TransportAllTable, 'transportStartDate');

export const transportOurCellKey = tableCellKey(TransportOurTable, 'origin');
export const transportOurStatusCellKey = tableCellKey(TransportOurTable, 'status');
export const transportOurVehicleCellKey = tableCellKey(TransportOurTable, 'vehiclePlate');
export const transportOurVehicleTypeCellKey = tableCellKey(TransportOurTable, 'vehicleType');
export const transportOurPeriodCellKey = tableCellKey(TransportOurTable, 'transportStartDate');
