import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';
import { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Route } from '../data/route.model';

export const ROUTE_TABLE_FILTERS: FilterDef<Route>[] = [
  {
    key: 'origin',
    type: 'multiSelect',
    titleKey: 'portal.user.features.routes.table.filters.origin',
    placeholderKey: 'portal.user.features.routes.table.filters.allOrigins',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.routes.table.filterGroups.route',
  },
  {
    key: 'destination',
    type: 'multiSelect',
    titleKey: 'portal.user.features.routes.table.filters.destination',
    placeholderKey: 'portal.user.features.routes.table.filters.allDestinations',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.routes.table.filterGroups.route',
  },
  {
    key: 'status',
    type: 'multiSelect',
    titleKey: 'portal.user.features.routes.table.filters.status',
    placeholderKey: 'portal.user.features.routes.table.filters.allStatuses',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.routes.table.filterGroups.attributes',
  },
  {
    key: 'vehicleType',
    type: 'multiSelect',
    titleKey: 'portal.user.features.routes.table.filters.vehicleType',
    placeholderKey: 'portal.user.features.routes.table.filters.allVehicleTypes',
    options: [...VEHICLE_TYPE_OPTIONS],
    showOptionIcons: true,
    groupTitleKey: 'portal.user.features.routes.table.filterGroups.attributes',
  },
  {
    key: 'transportPeriod',
    type: 'dateRange',
    titleKey: 'portal.user.features.routes.table.filters.period',
    field: 'transportStartDate',
    endField: 'transportEndDate',
    groupTitleKey: 'portal.user.features.routes.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.routes.table.filters.search',
    placeholderKey: 'portal.user.features.routes.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['vehiclePlate', 'vehicleName', 'description'],
  },
];

export const ROUTE_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.routes.all';
export const ROUTE_MY_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.routes.mine';
