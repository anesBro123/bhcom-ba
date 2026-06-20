import { LucideMap, LucidePlus, LucideSave, LucideTruck } from '@lucide/angular';

import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { defineForm } from '../../../../../shared/form';
import type { SelectOption } from '../../../../../shared/form/form.types';

import type { TransportFormModel } from '../data/transport.model';

export const TransportForm = defineForm<TransportFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.transport.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'route',
          titleKey: 'portal.user.features.transport.form.sections.route.title',
          subtitleKey: 'portal.user.features.transport.form.sections.route.subtitle',
          icon: LucideMap,
          fields: [
            {
              key: 'vehicleId',
              type: 'select',
              labelKey: 'portal.user.features.transport.form.fields.vehicleId',
              placeholderKey: 'portal.user.features.transport.form.placeholders.vehicleId',
              colSpan: 'full',
              options: [],
            },
            {
              key: 'origin',
              type: 'autocomplete',
              labelKey: 'portal.user.features.transport.form.fields.origin',
              placeholderKey: 'portal.user.features.transport.form.placeholders.origin',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'destination',
              type: 'autocomplete',
              labelKey: 'portal.user.features.transport.form.fields.destination',
              placeholderKey: 'portal.user.features.transport.form.placeholders.destination',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'transportStartDate',
              type: 'date',
              labelKey: 'portal.user.features.transport.form.fields.transportStartDate',
              placeholderKey: 'portal.user.features.transport.form.placeholders.transportStartDate',
              minDate: 'today',
              colSpan: 2,
            },
            {
              key: 'transportEndDate',
              type: 'date',
              labelKey: 'portal.user.features.transport.form.fields.transportEndDate',
              placeholderKey: 'portal.user.features.transport.form.placeholders.transportEndDate',
              minDate: (value) => value.transportStartDate || 'today',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'details',
          titleKey: 'portal.user.features.transport.form.sections.details.title',
          subtitleKey: 'portal.user.features.transport.form.sections.details.subtitle',
          icon: LucideTruck,
          fields: [
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.transport.form.fields.description',
              placeholderKey: 'portal.user.features.transport.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.transport.form.actions.create', icon: LucidePlus },
  },
});

export const TransportFormEditActions = {
  submit: { labelKey: 'portal.user.features.transport.form.actions.update', icon: LucideSave },
};

export function buildTransportForm(vehicleOptions: SelectOption[]) {
  return {
    ...TransportForm,
    steps: TransportForm.steps.map((step) => ({
      ...step,
      sections: step.sections?.map((section) => ({
        ...section,
        fields: section.fields?.map((field) =>
          field.key === 'vehicleId' ? { ...field, options: vehicleOptions } : field,
        ),
      })),
    })),
  };
}
