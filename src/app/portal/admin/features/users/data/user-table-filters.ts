import { BOOLEAN_FILTER_OPTIONS } from '../../../../../shared/constants/boolean-filter-options';

import type { FilterDef } from '../../../../../shared/table/table.types';
import type { User } from './user.model';

export const USER_TABLE_FILTERS: FilterDef<User>[] = [
  {
    key: 'canCreateRoute',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.users.table.filters.canCreateRoute',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'canAcceptRoute',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.users.table.filters.canAcceptRoute',
    options: [...BOOLEAN_FILTER_OPTIONS],
  },
  {
    key: 'dateOfBirth',
    type: 'dateRange',
    titleKey: 'shared.table.filters.period',
    field: 'dateOfBirth',
    singleDate: true,
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.admin.features.users.table.filters.search',
    placeholderKey: 'portal.admin.features.users.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: ['firstName', 'lastName', 'email', 'phone', 'jmbg'],
  },
];

export const USER_FILTER_STORAGE_KEY = 'bhcom-ba.filters.admin.users';
