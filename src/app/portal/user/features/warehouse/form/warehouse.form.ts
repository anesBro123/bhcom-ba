import { LucidePlus, LucideRuler, LucideSave, LucideWarehouse } from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';
import type { SelectOption } from '../../../../../shared/form/form.types';

import type { WarehouseFormModel } from '../data/warehouse.model';

export const WarehouseForm = defineForm<WarehouseFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.warehouse.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'warehouse',
          titleKey: 'portal.user.features.warehouse.form.sections.warehouse.title',
          subtitleKey: 'portal.user.features.warehouse.form.sections.warehouse.subtitle',
          icon: LucideWarehouse,
          fields: [
            {
              key: 'warehouseId',
              type: 'select',
              labelKey: 'portal.user.features.warehouse.form.fields.warehouseId',
              placeholderKey: 'portal.user.features.warehouse.form.placeholders.warehouseId',
              colSpan: 'full',
              options: [],
            },
          ],
        },
        {
          id: 'availability',
          titleKey: 'portal.user.features.warehouse.form.sections.availability.title',
          subtitleKey: 'portal.user.features.warehouse.form.sections.availability.subtitle',
          icon: LucideRuler,
          fields: [
            {
              key: 'availableFrom',
              endKey: 'availableTo',
              type: 'datePeriod',
              labelKey: 'portal.user.features.warehouse.table.filters.availabilityPeriod',
              placeholderKey: 'shared.datePeriod.placeholder',
              minDate: 'today',
              colSpan: 'full',
            },
            {
              key: 'spaceM2',
              type: 'number',
              labelKey: 'portal.user.features.warehouse.form.fields.spaceM2',
              placeholderKey: 'portal.user.features.warehouse.form.placeholders.spaceM2',
              colSpan: 2,
            },
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.warehouse.form.fields.description',
              placeholderKey: 'portal.user.features.warehouse.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.warehouse.form.actions.create', icon: LucidePlus },
  },
});

export const WarehouseFormEditActions = {
  submit: { labelKey: 'portal.user.features.warehouse.form.actions.update', icon: LucideSave },
};

export function buildWarehouseForm(warehouseOptions: SelectOption[]) {
  return {
    ...WarehouseForm,
    steps: WarehouseForm.steps.map((step) => ({
      ...step,
      sections: step.sections?.map((section) => ({
        ...section,
        fields: section.fields?.map((field) =>
          field.key === 'warehouseId' ? { ...field, options: warehouseOptions } : field,
        ),
      })),
    })),
  };
}
