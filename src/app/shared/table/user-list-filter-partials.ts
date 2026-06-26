import { BIH_CITY_OPTIONS } from '../constants/bih-cities';
import { USER_ENTITY_STATUS_OPTIONS } from '../constants/user-entity-status';

import type { FilterDef } from './table.types';

type RouteFilterEntity = { origin: string; destination: string; status: string };

export function routeCityFilters<T extends RouteFilterEntity>(
  i18nPrefix: string,
): FilterDef<T>[] {
  const cityOptions = BIH_CITY_OPTIONS.map((city) => ({ value: city.value, label: city.label }));

  return [
    {
      key: 'origin',
      type: 'multiSelect',
      titleKey: `${i18nPrefix}.origin`,
      placeholderKey: `${i18nPrefix}.allOrigins`,
      options: cityOptions,
      searchable: true,
    },
    {
      key: 'destination',
      type: 'multiSelect',
      titleKey: `${i18nPrefix}.destination`,
      placeholderKey: `${i18nPrefix}.allDestinations`,
      options: cityOptions,
      searchable: true,
    },
  ] as FilterDef<T>[];
}

export function entityStatusFilter<T extends { status: string }>(
  i18nPrefix: string,
): FilterDef<T> {
  return {
    key: 'status',
    type: 'optionTiles',
    titleKey: `${i18nPrefix}.status`,
    options: [...USER_ENTITY_STATUS_OPTIONS],
    showStatusBadges: true,
  } as FilterDef<T>;
}
