import { LucidePencil, LucideTrash } from '@lucide/angular';

import { defineTable } from '../../../../../shared/table';

import type { User } from '../data/user.model';
import { ADMIN_USERS_API } from '../data/user.constants';

export const UserTable = defineTable<User>()({
  endpoint: ADMIN_USERS_API,
  titleKey: 'portal.admin.features.users.table.title',
  summaryKey: 'shared.table.common.showingSummary',
  entityKey: 'portal.admin.features.users.table.entity',
  defaultPageSize: 10,
  defaultSort: { field: 'lastName', direction: 'asc' },
  trackBy: 'id',
  columns: [
    {
      key: 'firstName',
      titleKey: 'portal.admin.features.users.table.columns.firstName',
      sortable: true,
      width: '140px',
    },
    {
      key: 'lastName',
      titleKey: 'portal.admin.features.users.table.columns.lastName',
      sortable: true,
      width: '140px',
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
      { id: 'edit', labelKey: 'portal.admin.features.users.table.actions.edit', icon: LucidePencil },
      {
        id: 'delete',
        labelKey: 'portal.admin.features.users.table.actions.delete',
        icon: LucideTrash,
        danger: true,
      },
    ],
  },
  filters: [
    {
      key: 'firstName',
      type: 'search',
      titleKey: 'portal.admin.features.users.table.filters.search',
      placeholderKey: 'portal.admin.features.users.table.filters.searchPlaceholder',
      debounceMs: 300,
      searchFields: ['firstName', 'lastName', 'email', 'phone', 'jmbg'],
    },
  ],
});
