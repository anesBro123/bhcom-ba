import { entityStatusFilter, routeCityFilters } from '../../../../../shared/table/user-list-filter-partials';

import type { FilterDef } from '../../../../../shared/table/table.types';
import { FREIGHT_TYPE_OPTIONS } from './freight.constants';
import type { Freight } from './freight.model';

const I18N = 'portal.user.features.freight.table.filters';

export const FREIGHT_TABLE_FILTERS: FilterDef<Freight>[] = [
  ...routeCityFilters<Freight>(I18N),
  entityStatusFilter<Freight>(I18N),
  {
    key: 'freightType',
    type: 'optionTiles',
    titleKey: `${I18N}.freightType`,
    options: [...FREIGHT_TYPE_OPTIONS],
  },
  {
    key: 'size',
    type: 'numberRange',
    titleKey: `${I18N}.size`,
    min: 0,
    max: 50,
    step: 0.5,
  },
  {
    key: 'weightKg',
    type: 'numberRange',
    titleKey: `${I18N}.weightKg`,
    chipTitleKey: `${I18N}.weightChip`,
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.kg',
  },
  {
    key: 'neededByDate',
    type: 'dateRange',
    titleKey: 'shared.table.filters.period',
    field: 'neededByDate',
    singleDate: true,
  },
  {
    key: 'search',
    type: 'search',
    titleKey: `${I18N}.search`,
    placeholderKey: `${I18N}.searchPlaceholder`,
    debounceMs: 300,
    searchFields: ['description'],
  },
];

export const FREIGHT_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.freight.all';
export const FREIGHT_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.freight.our';
