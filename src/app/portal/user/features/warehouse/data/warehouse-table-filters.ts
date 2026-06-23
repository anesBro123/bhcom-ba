import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Warehouse } from './warehouse.model';

export const WAREHOUSE_TABLE_FILTERS: FilterDef<Warehouse>[] = [
  {
    key: 'warehouseCity',
    type: 'multiSelect',
    titleKey: 'portal.user.features.warehouse.table.filters.city',
    placeholderKey: 'portal.user.features.warehouse.table.filters.allCities',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.warehouse.table.filterGroups.location',
  },
  {
    key: 'status',
    type: 'optionTiles',
    titleKey: 'portal.user.features.warehouse.table.filters.status',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.warehouse.table.filterGroups.attributes',
  },
  {
    key: 'spaceM2',
    type: 'numberRange',
    titleKey: 'portal.user.features.warehouse.table.filters.spaceM2',
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.m2',
    groupTitleKey: 'portal.user.features.warehouse.table.filterGroups.attributes',
  },
  {
    key: 'availabilityPeriod',
    type: 'dateRange',
    titleKey: 'shared.table.filters.period',
    field: 'availableFrom',
    endField: 'availableTo',
    groupTitleKey: 'portal.user.features.warehouse.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.warehouse.table.filters.search',
    placeholderKey: 'portal.user.features.warehouse.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['description'],
  },
];

export const WAREHOUSE_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.warehouse.all';
export const WAREHOUSE_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.warehouse.mine';
