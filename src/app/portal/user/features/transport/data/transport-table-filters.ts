import { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';
import { entityStatusFilter, routeCityFilters } from '../../../../../shared/table/user-list-filter-partials';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Transport } from '../data/transport.model';

const I18N = 'portal.user.features.transport.table.filters';

export const TRANSPORT_TABLE_FILTERS: FilterDef<Transport>[] = [
  ...routeCityFilters<Transport>(I18N),
  entityStatusFilter<Transport>(I18N),
  {
    key: 'vehicleType',
    type: 'optionTiles',
    titleKey: `${I18N}.vehicleType`,
    options: [...VEHICLE_TYPE_OPTIONS],
    showOptionIcons: true,
  },
  {
    key: 'transportPeriod',
    type: 'dateRange',
    titleKey: 'shared.table.filters.period',
    field: 'transportStartDate',
    endField: 'transportEndDate',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: `${I18N}.search`,
    placeholderKey: `${I18N}.searchPlaceholder`,
    debounceMs: 300,
    searchFields: ['vehiclePlate', 'vehicleName', 'description'],
  },
];

export const TRANSPORT_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.transport.all';
export const TRANSPORT_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.transport.our';
