import { LucideMap, LucidePlus, LucideSave, LucideTruck } from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';
import type { SelectOption } from '../../../../../shared/form/form.types';

import type { RouteFormModel } from '../data/route.model';

export const RouteForm = defineForm<RouteFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.routes.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'route',
          titleKey: 'portal.user.features.routes.form.sections.route.title',
          subtitleKey: 'portal.user.features.routes.form.sections.route.subtitle',
          icon: LucideMap,
          fields: [
            {
              key: 'vehicleId',
              type: 'select',
              labelKey: 'portal.user.features.routes.form.fields.vehicleId',
              placeholderKey: 'portal.user.features.routes.form.placeholders.vehicleId',
              colSpan: 'full',
              options: [],
            },
            {
              key: 'origin',
              type: 'text',
              labelKey: 'portal.user.features.routes.form.fields.origin',
              placeholderKey: 'portal.user.features.routes.form.placeholders.origin',
              colSpan: 2,
            },
            {
              key: 'destination',
              type: 'text',
              labelKey: 'portal.user.features.routes.form.fields.destination',
              placeholderKey: 'portal.user.features.routes.form.placeholders.destination',
              colSpan: 2,
            },
            {
              key: 'transportDate',
              type: 'date',
              labelKey: 'portal.user.features.routes.form.fields.transportDate',
              placeholderKey: 'portal.user.features.routes.form.placeholders.transportDate',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'details',
          titleKey: 'portal.user.features.routes.form.sections.details.title',
          subtitleKey: 'portal.user.features.routes.form.sections.details.subtitle',
          icon: LucideTruck,
          fields: [
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.routes.form.fields.description',
              placeholderKey: 'portal.user.features.routes.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.routes.form.actions.create', icon: LucidePlus },
  },
});

export const RouteFormEditActions = {
  submit: { labelKey: 'portal.user.features.routes.form.actions.update', icon: LucideSave },
};

export function buildRouteForm(vehicleOptions: SelectOption[]) {
  return {
    ...RouteForm,
    steps: RouteForm.steps.map((step) => ({
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
