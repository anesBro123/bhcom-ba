import { LucideEye, LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable, tableCellKey } from '../../../../../shared/table';

import type { User } from '../data/user.model';
import { ADMIN_USERS_API } from '../data/user.constants';
import { USER_FILTER_STORAGE_KEY, USER_TABLE_FILTERS } from '../data/user-table-filters';

export const UserTable = defineTable<User>()({
  endpoint: ADMIN_USERS_API,
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.users.table.entity',
  filterStorageKey: USER_FILTER_STORAGE_KEY,
  defaultPageSize: 10,
  defaultSort: { field: 'lastName', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'lastName',
      titleKey: 'portal.admin.features.users.table.columns.name',
      sortable: true,
      cell: 'custom',
      width: '14rem',
      mobile: { primary: true },
    },
    {
      key: 'email',
      titleKey: 'portal.admin.features.users.table.columns.email',
      sortable: true,
      width: '220px',
    },
    {
      key: 'phone',
      titleKey: 'portal.admin.features.users.table.columns.phone',
      sortable: true,
      width: '160px',
    },
    {
      key: 'dateOfBirth',
      titleKey: 'portal.admin.features.users.table.columns.dateOfBirth',
      sortable: true,
      format: 'date',
      width: '140px',
    },
    {
      key: 'jmbg',
      titleKey: 'portal.admin.features.users.table.columns.jmbg',
      sortable: true,
      width: '160px',
    },
  ],
  actions: {
    width: '3.5rem',
    items: [
      {
        id: 'viewDetails',
        labelKey: 'portal.admin.features.users.table.actions.viewDetails',
        icon: LucideEye,
      },
      { id: 'edit', labelKey: 'portal.admin.features.users.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.users.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: USER_TABLE_FILTERS,
});

export const userNameCellKey = tableCellKey(UserTable, 'lastName');
