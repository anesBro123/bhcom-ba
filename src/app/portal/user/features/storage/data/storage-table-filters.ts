import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Storage } from './storage.model';

export const STORAGE_TABLE_FILTERS: FilterDef<Storage>[] = [
  {
    key: 'warehouseCity',
    type: 'multiSelect',
    titleKey: 'portal.user.features.storage.table.filters.city',
    placeholderKey: 'portal.user.features.storage.table.filters.allCities',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.storage.table.filterGroups.location',
  },
  {
    key: 'status',
    type: 'multiSelect',
    titleKey: 'portal.user.features.storage.table.filters.status',
    placeholderKey: 'portal.user.features.storage.table.filters.allStatuses',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.storage.table.filterGroups.attributes',
  },
  {
    key: 'spaceM2',
    type: 'numberRange',
    titleKey: 'portal.user.features.storage.table.filters.spaceM2',
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.m2',
    groupTitleKey: 'portal.user.features.storage.table.filterGroups.attributes',
  },
  {
    key: 'availabilityPeriod',
    type: 'dateRange',
    titleKey: 'portal.user.features.storage.table.filters.availabilityPeriod',
    field: 'availableFrom',
    endField: 'availableTo',
    groupTitleKey: 'portal.user.features.storage.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.storage.table.filters.search',
    placeholderKey: 'portal.user.features.storage.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['description'],
  },
];

export const STORAGE_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.storage.all';
export const STORAGE_MY_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.storage.mine';
