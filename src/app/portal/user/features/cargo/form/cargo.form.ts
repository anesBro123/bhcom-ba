import { LucideMapPin, LucidePackage, LucidePlus, LucideSave } from '@lucide/angular';

import { BIH_CITY_OPTIONS } from '../../../../../shared/constants/bih-cities';
import { defineForm } from '../../../../../shared/form';

import { CARGO_SIZE_UNIT_BY_TYPE, CARGO_TYPE_OPTIONS } from '../data/cargo.constants';
import type { CargoFormModel, CargoType } from '../data/cargo.model';

export const CargoForm = defineForm<CargoFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.cargo.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'route',
          titleKey: 'portal.user.features.cargo.form.sections.route.title',
          subtitleKey: 'portal.user.features.cargo.form.sections.route.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'origin',
              type: 'autocomplete',
              labelKey: 'portal.user.features.cargo.form.fields.origin',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.origin',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'destination',
              type: 'autocomplete',
              labelKey: 'portal.user.features.cargo.form.fields.destination',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.destination',
              colSpan: 2,
              options: BIH_CITY_OPTIONS,
            },
            {
              key: 'neededByDate',
              type: 'date',
              labelKey: 'portal.user.features.cargo.form.fields.neededByDate',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.neededByDate',
              minDate: 'today',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'cargo',
          titleKey: 'portal.user.features.cargo.form.sections.cargo.title',
          subtitleKey: 'portal.user.features.cargo.form.sections.cargo.subtitle',
          icon: LucidePackage,
          fields: [
            {
              key: 'cargoType',
              type: 'select',
              labelKey: 'portal.user.features.cargo.form.fields.cargoType',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.cargoType',
              colSpan: 2,
              options: [...CARGO_TYPE_OPTIONS],
            },
            {
              key: 'size',
              type: 'number',
              labelKey: 'portal.user.features.cargo.form.fields.sizeWithUnit.pallets',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.size',
              colSpan: 2,
            },
            {
              key: 'weightKg',
              type: 'number',
              labelKey: 'portal.user.features.cargo.form.fields.weightKg',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.weightKg',
              colSpan: 2,
            },
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.cargo.form.fields.description',
              placeholderKey: 'portal.user.features.cargo.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.cargo.form.actions.create', icon: LucidePlus },
  },
});

export const CargoFormEditActions = {
  submit: { labelKey: 'portal.user.features.cargo.form.actions.update', icon: LucideSave },
};

function sizeFieldLabelKey(cargoType: CargoType): string {
  return `portal.user.features.cargo.form.fields.sizeWithUnit.${CARGO_SIZE_UNIT_BY_TYPE[cargoType]}`;
}

export function buildCargoForm(cargoType: CargoType) {
  return {
    ...CargoForm,
    steps: CargoForm.steps.map((formStep) => ({
      ...formStep,
      sections: formStep.sections?.map((section) => ({
        ...section,
        fields: section.fields?.map((field) => {
          if (field.key !== 'size') {
            return field;
          }

          return {
            ...field,
            labelKey: sizeFieldLabelKey(cargoType),
          };
        }),
      })),
    })),
  };
}
