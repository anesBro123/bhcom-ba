import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../../../../../shared/constants/user-entity-status';

import type { FilterDef } from '../../../../../shared/table/table.types';
import { FREIGHT_TYPE_OPTIONS } from './freight.constants';
import type { Freight } from './freight.model';

export const FREIGHT_TABLE_FILTERS: FilterDef<Freight>[] = [
  {
    key: 'origin',
    type: 'multiSelect',
    titleKey: 'portal.user.features.freight.table.filters.origin',
    placeholderKey: 'portal.user.features.freight.table.filters.allOrigins',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.route',
  },
  {
    key: 'destination',
    type: 'multiSelect',
    titleKey: 'portal.user.features.freight.table.filters.destination',
    placeholderKey: 'portal.user.features.freight.table.filters.allDestinations',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.route',
  },
  {
    key: 'status',
    type: 'optionTiles',
    titleKey: 'portal.user.features.freight.table.filters.status',
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.attributes',
  },
  {
    key: 'freightType',
    type: 'optionTiles',
    titleKey: 'portal.user.features.freight.table.filters.freightType',
    options: [...FREIGHT_TYPE_OPTIONS],
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.attributes',
  },
  {
    key: 'size',
    type: 'numberRange',
    titleKey: 'portal.user.features.freight.table.filters.size',
    min: 0,
    max: 50,
    step: 0.5,
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.attributes',
  },
  {
    key: 'weightKg',
    type: 'numberRange',
    titleKey: 'portal.user.features.freight.table.filters.weightKg',
    chipTitleKey: 'portal.user.features.freight.table.filters.weightChip',
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.kg',
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.attributes',
  },
  {
    key: 'neededByDate',
    type: 'dateRange',
    titleKey: 'portal.user.features.freight.table.filters.neededByDate',
    field: 'neededByDate',
    singleDate: true,
    groupTitleKey: 'portal.user.features.freight.table.filterGroups.dates',
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.user.features.freight.table.filters.search',
    placeholderKey: 'portal.user.features.freight.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['description'],
  },
];

export const FREIGHT_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.freight.all';
export const FREIGHT_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.freight.mine';
