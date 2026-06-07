import { LucideBuilding2, LucideMapPin, LucideSend, LucideUser } from '@lucide/angular';

import { defineForm } from '../../../shared/form';

import { COUNTRY_OPTIONS, TITLE_OPTIONS } from './register-company.constants';
import type { RegisterCompanyFormModel } from './register-company.model';

export const RegisterCompanyForm = defineForm<RegisterCompanyFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'personal',
      titleKey: 'forms.registerCompany.steps.personal',
      kind: 'fields',
      sections: [
        {
          id: 'contact',
          titleKey: 'forms.registerCompany.sections.contact.title',
          subtitleKey: 'forms.registerCompany.sections.contact.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'title',
              type: 'select',
              labelKey: 'forms.registerCompany.fields.title',
              colSpan: 4,
              options: TITLE_OPTIONS,
            },
            {
              key: 'firstName',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.firstName',
              autocomplete: 'given-name',
              colSpan: 5,
            },
            {
              key: 'lastName',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.lastName',
              autocomplete: 'family-name',
              colSpan: 5,
            },
            {
              key: 'email',
              type: 'email',
              labelKey: 'forms.registerCompany.fields.email',
              autocomplete: 'email',
              colSpan: 'full',
            },
            {
              key: 'password',
              type: 'password',
              labelKey: 'forms.registerCompany.fields.password',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'passwordConfirm',
              type: 'password',
              labelKey: 'forms.registerCompany.fields.passwordConfirm',
              autocomplete: 'new-password',
              colSpan: 'full',
            },
            {
              key: 'phone',
              type: 'tel',
              labelKey: 'forms.registerCompany.fields.phone',
              autocomplete: 'tel',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'company',
      titleKey: 'forms.registerCompany.steps.company',
      kind: 'fields',
      sections: [
        {
          id: 'business',
          titleKey: 'forms.registerCompany.sections.business.title',
          subtitleKey: 'forms.registerCompany.sections.business.subtitle',
          icon: LucideBuilding2,
          fields: [
            {
              key: 'companyName',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.companyName',
              autocomplete: 'organization',
              colSpan: 'full',
            },
            {
              key: 'vatId',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.vatId',
              colSpan: 'full',
            },
          ],
        },
      ],
    },
    {
      id: 'location',
      titleKey: 'forms.registerCompany.steps.location',
      kind: 'fields',
      sections: [
        {
          id: 'address',
          titleKey: 'forms.registerCompany.sections.address.title',
          subtitleKey: 'forms.registerCompany.sections.address.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'country',
              type: 'select',
              labelKey: 'forms.registerCompany.fields.country',
              colSpan: 'full',
              options: COUNTRY_OPTIONS,
            },
            {
              key: 'city',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.city',
              autocomplete: 'address-level2',
              colSpan: 2,
            },
            {
              key: 'postcode',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.postcode',
              autocomplete: 'postal-code',
              colSpan: 2,
            },
            {
              key: 'address',
              type: 'text',
              labelKey: 'forms.registerCompany.fields.address',
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
    submit: { labelKey: 'forms.registerCompany.actions.submit', icon: LucideSend },
  },
});
