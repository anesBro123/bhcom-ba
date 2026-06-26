import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { BOOLEAN_FILTER_OPTIONS } from '../../../../../shared/constants/boolean-filter-options';

import type { FilterDef } from '../../../../../shared/table/table.types';
import { WAREHOUSE_TYPE_OPTIONS } from './warehouse.constants';
import type { Warehouse } from './warehouse.model';

export const WAREHOUSE_TABLE_FILTERS: FilterDef<Warehouse>[] = [
  {
    key: 'city',
    type: 'multiSelect',
    titleKey: 'portal.admin.features.warehouses.table.filters.city',
    placeholderKey: 'portal.admin.features.warehouses.table.filters.allCities',
    options: BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label })),
    searchable: true,
  },
  {
    key: 'type',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.warehouses.table.filters.type',
    options: [...WAREHOUSE_TYPE_OPTIONS],
  },
  {
    key: 'capacityM2',
    type: 'numberRange',
    titleKey: 'portal.admin.features.warehouses.table.filters.capacityM2',
    min: 0,
    max: 10000,
    step: 50,
    unitSuffixKey: 'shared.table.filters.units.m2',
  },
  {
    key: 'height',
    type: 'numberRange',
    titleKey: 'portal.admin.features.warehouses.table.filters.height',
    min: 0,
    max: 30,
    step: 0.5,
    unitSuffixKey: 'shared.table.filters.units.m',
  },
  {
    key: 'floorCount',
    type: 'numberRange',
    titleKey: 'portal.admin.features.warehouses.table.filters.floorCount',
    min: 0,
    max: 20,
    step: 1,
  },
  {
    key: 'rackCount',
    type: 'numberRange',
    titleKey: 'portal.admin.features.warehouses.table.filters.rackCount',
    min: 0,
    max: 500,
    step: 10,
  },
  {
    key: 'enclosed',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.warehouses.table.filters.enclosed',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'cameras',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.warehouses.table.filters.cameras',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'ramp',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.warehouses.table.filters.ramp',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'physicalSecurity',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.warehouses.table.filters.physicalSecurity',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.admin.features.warehouses.table.filters.search',
    placeholderKey: 'portal.admin.features.warehouses.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['name', 'address', 'country'],
  },
];

export const WAREHOUSE_FILTER_STORAGE_KEY = 'bhcom-ba.filters.admin.warehouses';
