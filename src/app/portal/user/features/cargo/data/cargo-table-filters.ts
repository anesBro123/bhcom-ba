import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';

import type { FilterDef } from '../../../../../shared/table/table.types';
import { CARGO_TYPE_OPTIONS } from './cargo.constants';
import type { Cargo } from './cargo.model';

export const CARGO_TABLE_FILTERS: FilterDef<Cargo>[] = [
  {
    key: 'origin',
    type: 'multiSelect',
    titleKey: 'portal.user.features.cargo.table.filters.origin',
    placeholderKey: 'portal.user.features.cargo.table.filters.allOrigins',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.route',
  },
  {
    key: 'destination',
    type: 'multiSelect',
    titleKey: 'portal.user.features.cargo.table.filters.destination',
    placeholderKey: 'portal.user.features.cargo.table.filters.allDestinations',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.route',
  },
  {
    key: 'status',
    type: 'multiSelect',
    titleKey: 'portal.user.features.cargo.table.filters.status',
    placeholderKey: 'portal.user.features.cargo.table.filters.allStatuses',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.attributes',
  },
  {
    key: 'cargoType',
    type: 'multiSelect',
    titleKey: 'portal.user.features.cargo.table.filters.cargoType',
    placeholderKey: 'portal.user.features.cargo.table.filters.allTypes',
    options: [...CARGO_TYPE_OPTIONS],
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.attributes',
  },
  {
    key: 'size',
    type: 'numberRange',
    titleKey: 'portal.user.features.cargo.table.filters.size',
    min: 0,
    max: 50,
    step: 0.5,
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.attributes',
  },
  {
    key: 'weightKg',
    type: 'numberRange',
    titleKey: 'portal.user.features.cargo.table.filters.weightKg',
    chipTitleKey: 'portal.user.features.cargo.table.filters.weightChip',
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.kg',
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.attributes',
  },
  {
    key: 'neededByDate',
    type: 'dateRange',
    titleKey: 'portal.user.features.cargo.table.filters.neededByDate',
    field: 'neededByDate',
    groupTitleKey: 'portal.user.features.cargo.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.cargo.table.filters.search',
    placeholderKey: 'portal.user.features.cargo.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['description'],
  },
];

export const CARGO_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.cargo.all';
export const CARGO_MY_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.cargo.mine';
