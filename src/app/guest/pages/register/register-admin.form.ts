import { LucideBuilding2, LucideMapPin, LucideSend, LucideUser } from '@lucide/angular';

import { defineForm } from '../../../shared/form';

import { COUNTRY_OPTIONS, TITLE_OPTIONS } from './register-admin.constants';
import type { RegisterAdminFormModel } from './register-admin.model';

export const RegisterAdminForm = defineForm<RegisterAdminFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'personal',
      titleKey: 'forms.registerAdmin.steps.personal',
      kind: 'fields',
      sections: [
        {
          id: 'contact',
          titleKey: 'forms.registerAdmin.sections.contact.title',
          subtitleKey: 'forms.registerAdmin.sections.contact.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'title',
              type: 'select',
              labelKey: 'forms.registerAdmin.fields.title',
              colSpan: 4,
              options: TITLE_OPTIONS,
            },
            {
              key: 'firstName',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.firstName',
              autocomplete: 'given-name',
              colSpan: 5,
            },
            {
              key: 'lastName',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.lastName',
              autocomplete: 'family-name',
              colSpan: 5,
            },
            {
              key: 'email',
              type: 'email',
              labelKey: 'forms.registerAdmin.fields.email',
              autocomplete: 'email',
              colSpan: 'full',
            },
            {
              key: 'password',
              type: 'password',
              labelKey: 'forms.registerAdmin.fields.password',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'passwordConfirm',
              type: 'password',
              labelKey: 'forms.registerAdmin.fields.passwordConfirm',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'phone',
              type: 'tel',
              labelKey: 'forms.registerAdmin.fields.phone',
              autocomplete: 'tel',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'company',
      titleKey: 'forms.registerAdmin.steps.company',
      kind: 'fields',
      sections: [
        {
          id: 'business',
          titleKey: 'forms.registerAdmin.sections.business.title',
          subtitleKey: 'forms.registerAdmin.sections.business.subtitle',
          icon: LucideBuilding2,
          fields: [
            {
              key: 'companyName',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.companyName',
              autocomplete: 'organization',
              colSpan: 'full',
            },
            {
              key: 'vatId',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.vatId',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'location',
      titleKey: 'forms.registerAdmin.steps.location',
      kind: 'fields',
      sections: [
        {
          id: 'address',
          titleKey: 'forms.registerAdmin.sections.address.title',
          subtitleKey: 'forms.registerAdmin.sections.address.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'country',
              type: 'select',
              labelKey: 'forms.registerAdmin.fields.country',
              colSpan: 'full',
              options: COUNTRY_OPTIONS,
            },
            {
              key: 'city',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.city',
              autocomplete: 'address-level2',
              colSpan: 2,
            },
            {
              key: 'postcode',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.postcode',
              autocomplete: 'postal-code',
              colSpan: 2,
            },
            {
              key: 'address',
              type: 'text',
              labelKey: 'forms.registerAdmin.fields.address',
              autocomplete: 'street-address',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'forms.common.previous' },
    next: { labelKey: 'forms.common.next' },
    submit: { labelKey: 'forms.registerAdmin.actions.submit', icon: LucideSend },
  },
});
