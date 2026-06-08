import { LucideBuilding2, LucideMapPin, LucideSend, LucideUser } from '@lucide/angular';

import { defineForm } from '../../../shared/form';

import { COUNTRY_OPTIONS, TITLE_OPTIONS } from './register-company.constants';
import type { RegisterCompanyFormModel } from './register-company.model';

export const RegisterCompanyForm = defineForm<RegisterCompanyFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'personal',
      titleKey: 'guest.register.form.steps.personal',
      kind: 'fields',
      sections: [
        {
          id: 'contact',
          titleKey: 'guest.register.form.sections.contact.title',
          subtitleKey: 'guest.register.form.sections.contact.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'title',
              type: 'select',
              labelKey: 'guest.register.form.fields.title',
              colSpan: 4,
              options: TITLE_OPTIONS,
            },
            {
              key: 'firstName',
              type: 'text',
              labelKey: 'guest.register.form.fields.firstName',
              autocomplete: 'given-name',
              colSpan: 5,
            },
            {
              key: 'lastName',
              type: 'text',
              labelKey: 'guest.register.form.fields.lastName',
              autocomplete: 'family-name',
              colSpan: 5,
            },
            {
              key: 'email',
              type: 'email',
              labelKey: 'guest.register.form.fields.email',
              autocomplete: 'email',
              colSpan: 'full',
            },
            {
              key: 'password',
              type: 'password',
              labelKey: 'guest.register.form.fields.password',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'passwordConfirm',
              type: 'password',
              labelKey: 'guest.register.form.fields.passwordConfirm',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'phone',
              type: 'tel',
              labelKey: 'guest.register.form.fields.phone',
              autocomplete: 'tel',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'company',
      titleKey: 'guest.register.form.steps.company',
      kind: 'fields',
      sections: [
        {
          id: 'business',
          titleKey: 'guest.register.form.sections.business.title',
          subtitleKey: 'guest.register.form.sections.business.subtitle',
          icon: LucideBuilding2,
          fields: [
            {
              key: 'companyName',
              type: 'text',
              labelKey: 'guest.register.form.fields.companyName',
              autocomplete: 'organization',
              colSpan: 'full',
            },
            {
              key: 'vatId',
              type: 'text',
              labelKey: 'guest.register.form.fields.vatId',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'location',
      titleKey: 'guest.register.form.steps.location',
      kind: 'fields',
      sections: [
        {
          id: 'address',
          titleKey: 'guest.register.form.sections.address.title',
          subtitleKey: 'guest.register.form.sections.address.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'country',
              type: 'select',
              labelKey: 'guest.register.form.fields.country',
              colSpan: 'full',
              options: COUNTRY_OPTIONS,
            },
            {
              key: 'city',
              type: 'text',
              labelKey: 'guest.register.form.fields.city',
              autocomplete: 'address-level2',
              colSpan: 2,
            },
            {
              key: 'postcode',
              type: 'text',
              labelKey: 'guest.register.form.fields.postcode',
              autocomplete: 'postal-code',
              colSpan: 2,
            },
            {
              key: 'address',
              type: 'text',
              labelKey: 'guest.register.form.fields.address',
              autocomplete: 'street-address',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'shared.form.common.previous' },
    next: { labelKey: 'shared.form.common.next' },
    submit: { labelKey: 'guest.register.form.actions.submit', icon: LucideSend },
  },
});
