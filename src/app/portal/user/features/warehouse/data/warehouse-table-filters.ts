import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { entityStatusFilter } from '../../../../../shared/table/user-list-filter-partials';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { Warehouse } from './warehouse.model';

const I18N = 'portal.user.features.warehouse.table.filters';

export const WAREHOUSE_TABLE_FILTERS: FilterDef<Warehouse>[] = [
  {
    key: 'warehouseCity',
    type: 'multiSelect',
    titleKey: `${I18N}.city`,
    placeholderKey: `${I18N}.allCities`,
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
  },
  entityStatusFilter<Warehouse>(I18N),
  {
    key: 'spaceM2',
    type: 'numberRange',
    titleKey: `${I18N}.spaceM2`,
    min: 0,
    max: 5000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.m2',
  },
  {
    key: 'availabilityPeriod',
    type: 'dateRange',
    titleKey: 'shared.table.filters.period',
    field: 'availableFrom',
    endField: 'availableTo',
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

export const WAREHOUSE_ALL_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.warehouse.all';
export const WAREHOUSE_OUR_FILTER_STORAGE_KEY = 'bhcom-ba.filters.user.warehouse.our';
