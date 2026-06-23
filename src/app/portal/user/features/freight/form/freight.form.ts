import { LucideMapPin, LucidePackage, LucidePlus, LucideSave } from '@lucide/angular';

import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { defineForm } from '../../../../../shared/form';

import { FREIGHT_SIZE_UNIT_BY_TYPE, FREIGHT_TYPE_OPTIONS } from '../data/freight.constants';
import type { FreightFormModel, FreightType } from '../data/freight.model';

export const FreightForm = defineForm<FreightFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.freight.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'route',
          titleKey: 'portal.user.features.freight.form.sections.route.title',
          subtitleKey: 'portal.user.features.freight.form.sections.route.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'origin',
              type: 'autocomplete',
              labelKey: 'portal.user.features.freight.form.fields.origin',
              placeholderKey: 'portal.user.features.freight.form.placeholders.origin',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'destination',
              type: 'autocomplete',
              labelKey: 'portal.user.features.freight.form.fields.destination',
              placeholderKey: 'portal.user.features.freight.form.placeholders.destination',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'neededByDate',
              type: 'datePeriod',
              periodMode: 'single',
              labelKey: 'portal.user.features.freight.form.fields.neededByDate',
              placeholderKey: 'shared.datePeriod.placeholder',
              minDate: 'today',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'cargo',
          titleKey: 'portal.user.features.freight.form.sections.freight.title',
          subtitleKey: 'portal.user.features.freight.form.sections.freight.subtitle',
          icon: LucidePackage,
          fields: [
            {
              key: 'freightType',
              type: 'select',
              labelKey: 'portal.user.features.freight.form.fields.freightType',
              placeholderKey: 'portal.user.features.freight.form.placeholders.freightType',
              colSpan: 2,
              options: [...FREIGHT_TYPE_OPTIONS],
            },
            {
              key: 'size',
              type: 'number',
              labelKey: 'portal.user.features.freight.form.fields.sizeWithUnit.pallets',
              placeholderKey: 'portal.user.features.freight.form.placeholders.size',
              colSpan: 2,
            },
            {
              key: 'weightKg',
              type: 'number',
              labelKey: 'portal.user.features.freight.form.fields.weightKg',
              placeholderKey: 'portal.user.features.freight.form.placeholders.weightKg',
              colSpan: 2,
            },
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.freight.form.fields.description',
              placeholderKey: 'portal.user.features.freight.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.freight.form.actions.create', icon: LucidePlus },
  },
});

export const FreightFormEditActions = {
  submit: { labelKey: 'portal.user.features.freight.form.actions.update', icon: LucideSave },
};

function sizeFieldLabelKey(freightType: FreightType): string {
  return `portal.user.features.freight.form.fields.sizeWithUnit.${FREIGHT_SIZE_UNIT_BY_TYPE[freightType]}`;
}

export function buildFreightForm(freightType: FreightType) {
  return {
    ...FreightForm,
    steps: FreightForm.steps.map((formStep) => ({
      ...formStep,
      sections: formStep.sections?.map((section) => ({
        ...section,
        fields: section.fields?.map((field) => {
          if (field.key !== 'size') {
            return field;
          }

          return {
            ...field,
            labelKey: sizeFieldLabelKey(freightType),
          };
        }),
      })),
    })),
  };
}
