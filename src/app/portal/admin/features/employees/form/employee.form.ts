import { LucideMail, LucidePlus, LucideSave, LucideShield, LucideUser } from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';

import type { EmployeeFormModel } from '../data/employee.model';

export const AdminEmployeeForm = defineForm<EmployeeFormModel>()({
  mode: 'stepper',
  titleKey: 'portal.admin.features.employees.form.titleCreate',
  steps: [
    {
      id: 'profile',
      titleKey: 'portal.admin.features.employees.form.steps.profile',
      kind: 'fields',
      sections: [
        {
          id: 'personal',
          titleKey: 'portal.admin.features.employees.form.sections.personal.title',
          subtitleKey: 'portal.admin.features.employees.form.sections.personal.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'firstName',
              type: 'text',
              labelKey: 'portal.admin.features.employees.form.fields.firstName',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.firstName',
              colSpan: 2,
            },
            {
              key: 'lastName',
              type: 'text',
              labelKey: 'portal.admin.features.employees.form.fields.lastName',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.lastName',
              colSpan: 2,
            },
            {
              key: 'dateOfBirth',
              type: 'date',
              labelKey: 'portal.admin.features.employees.form.fields.dateOfBirth',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.dateOfBirth',
              colSpan: 2,
            },
            {
              key: 'jmbg',
              type: 'text',
              labelKey: 'portal.admin.features.employees.form.fields.jmbg',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.jmbg',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'contact',
      titleKey: 'portal.admin.features.employees.form.steps.contact',
      kind: 'fields',
      sections: [
        {
          id: 'contactInfo',
          titleKey: 'portal.admin.features.employees.form.sections.contactInfo.title',
          subtitleKey: 'portal.admin.features.employees.form.sections.contactInfo.subtitle',
          icon: LucideMail,
          fields: [
            {
              key: 'email',
              type: 'email',
              labelKey: 'portal.admin.features.employees.form.fields.email',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.email',
              colSpan: 2,
            },
            {
              key: 'phone',
              type: 'tel',
              labelKey: 'portal.admin.features.employees.form.fields.phone',
              placeholderKey: 'portal.admin.features.employees.form.placeholders.phone',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'permissions',
      titleKey: 'portal.admin.features.employees.form.steps.permissions',
      kind: 'fields',
      sections: [
        {
          id: 'permissions',
          titleKey: 'portal.admin.features.employees.form.sections.permissions.title',
          subtitleKey: 'portal.admin.features.employees.form.sections.permissions.subtitle',
          icon: LucideShield,
          fields: [
            {
              key: 'canCreateShipment',
              type: 'toggle',
              labelKey: 'portal.admin.features.employees.form.fields.canCreateShipment',
              colSpan: 2,
            },
            {
              key: 'canAcceptShipment',
              type: 'toggle',
              labelKey: 'portal.admin.features.employees.form.fields.canAcceptShipment',
              colSpan: 2,
            },
            {
              key: 'canCreateRoute',
              type: 'toggle',
              labelKey: 'portal.admin.features.employees.form.fields.canCreateRoute',
              colSpan: 2,
            },
            {
              key: 'canAcceptRoute',
              type: 'toggle',
              labelKey: 'portal.admin.features.employees.form.fields.canAcceptRoute',
              colSpan: 2,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'shared.form.common.previous' },
    next: { labelKey: 'shared.form.common.next' },
    submit: { labelKey: 'portal.admin.features.employees.form.actions.create', icon: LucidePlus },
  },
});

export const AdminEmployeeFormEditActions = {
  submit: { labelKey: 'portal.admin.features.employees.form.actions.update', icon: LucideSave },
};
