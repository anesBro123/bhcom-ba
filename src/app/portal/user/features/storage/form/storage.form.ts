import { LucidePlus, LucideRuler, LucideSave, LucideWarehouse } from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';
import type { SelectOption } from '../../../../../shared/form/form.types';

import type { StorageFormModel } from '../data/storage.model';

export const StorageForm = defineForm<StorageFormModel>()({
  mode: 'single',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.storage.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'warehouse',
          titleKey: 'portal.user.features.storage.form.sections.warehouse.title',
          subtitleKey: 'portal.user.features.storage.form.sections.warehouse.subtitle',
          icon: LucideWarehouse,
          fields: [
            {
              key: 'warehouseId',
              type: 'select',
              labelKey: 'portal.user.features.storage.form.fields.warehouseId',
              placeholderKey: 'portal.user.features.storage.form.placeholders.warehouseId',
              colSpan: 'full',
              options: [],
            },
          ],
        },
        {
          id: 'availability',
          titleKey: 'portal.user.features.storage.form.sections.availability.title',
          subtitleKey: 'portal.user.features.storage.form.sections.availability.subtitle',
          icon: LucideRuler,
          fields: [
            {
              key: 'availableFrom',
              type: 'date',
              labelKey: 'portal.user.features.storage.form.fields.availableFrom',
              placeholderKey: 'portal.user.features.storage.form.placeholders.availableFrom',
              minDate: 'today',
              colSpan: 2,
            },
            {
              key: 'availableTo',
              type: 'date',
              labelKey: 'portal.user.features.storage.form.fields.availableTo',
              placeholderKey: 'portal.user.features.storage.form.placeholders.availableTo',
              minDate: (value) => value.availableFrom || 'today',
              colSpan: 2,
            },
            {
              key: 'spaceM2',
              type: 'number',
              labelKey: 'portal.user.features.storage.form.fields.spaceM2',
              placeholderKey: 'portal.user.features.storage.form.placeholders.spaceM2',
              colSpan: 2,
            },
            {
              key: 'description',
              type: 'textarea',
              labelKey: 'portal.user.features.storage.form.fields.description',
              placeholderKey: 'portal.user.features.storage.form.placeholders.description',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.storage.form.actions.create', icon: LucidePlus },
  },
});

export const StorageFormEditActions = {
  submit: { labelKey: 'portal.user.features.storage.form.actions.update', icon: LucideSave },
};

export function buildStorageForm(warehouseOptions: SelectOption[]) {
  return {
    ...StorageForm,
    steps: StorageForm.steps.map((step) => ({
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
