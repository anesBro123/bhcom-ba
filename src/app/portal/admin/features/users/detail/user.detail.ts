import { defineDetail } from '../../../../../shared/detail';

import type { User } from '../data/user.model';

const BOOLEAN_DETAIL_OPTIONS = [
  { value: 'true', labelKey: 'shared.common.booleanYes' },
  { value: 'false', labelKey: 'shared.common.booleanNo' },
] as const;

export const UserDetail = defineDetail<User>()({
  sections: [
    {
      id: 'profile',
      titleKey: 'portal.admin.features.users.form.steps.profile',
      fields: [
        {
          key: 'firstName',
          type: 'text',
          labelKey: 'portal.admin.features.users.form.fields.firstName',
        },
        {
          key: 'lastName',
          type: 'text',
          labelKey: 'portal.admin.features.users.form.fields.lastName',
        },
        {
          key: 'dateOfBirth',
          type: 'date',
          labelKey: 'portal.admin.features.users.form.fields.dateOfBirth',
        },
        {
          key: 'jmbg',
          type: 'text',
          labelKey: 'portal.admin.features.users.form.fields.jmbg',
        },
      ],
    },
    {
      id: 'contact',
      titleKey: 'portal.admin.features.users.form.steps.contact',
      fields: [
        {
          key: 'email',
          type: 'text',
          labelKey: 'portal.admin.features.users.form.fields.email',
        },
        {
          key: 'phone',
          type: 'text',
          labelKey: 'portal.admin.features.users.form.fields.phone',
        },
      ],
    },
    {
      id: 'permissions',
      titleKey: 'portal.admin.features.users.form.steps.permissions',
      fields: [
        {
          key: 'canCreateRoute',
          type: 'translate',
          labelKey: 'portal.admin.features.users.form.fields.canCreateRoute',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
        {
          key: 'canAcceptRoute',
          type: 'translate',
          labelKey: 'portal.admin.features.users.form.fields.canAcceptRoute',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
      ],
    },
  ],
});
