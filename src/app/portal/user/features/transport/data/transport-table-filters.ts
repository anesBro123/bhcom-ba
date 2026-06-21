import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';
import { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Transport } from '../data/transport.model';

export const TRANSPORT_TABLE_FILTERS: FilterDef<Transport>[] = [
  {
    key: 'origin',
    type: 'multiSelect',
    titleKey: 'portal.user.features.transport.table.filters.origin',
    placeholderKey: 'portal.user.features.transport.table.filters.allOrigins',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.transport.table.filterGroups.route',
  },
  {
    key: 'destination',
    type: 'multiSelect',
    titleKey: 'portal.user.features.transport.table.filters.destination',
    placeholderKey: 'portal.user.features.transport.table.filters.allDestinations',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.transport.table.filterGroups.route',
  },
  {
    key: 'status',
    type: 'optionTiles',
    titleKey: 'portal.user.features.transport.table.filters.status',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.transport.table.filterGroups.attributes',
  },
  {
    key: 'vehicleType',
    type: 'optionTiles',
    titleKey: 'portal.user.features.transport.table.filters.vehicleType',
    options: [...VEHICLE_TYPE_OPTIONS],
    showOptionIcons: true,
    groupTitleKey: 'portal.user.features.transport.table.filterGroups.attributes',
  },
  {
    key: 'transportPeriod',
    type: 'dateRange',
    titleKey: 'portal.user.features.transport.table.filters.period',
    field: 'transportStartDate',
    endField: 'transportEndDate',
    groupTitleKey: 'portal.user.features.transport.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.transport.table.filters.search',
    placeholderKey: 'portal.user.features.transport.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['vehiclePlate', 'vehicleName', 'description'],
  },
];

export const TRANSPORT_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.transport.all';
export const TRANSPORT_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.transport.our';
