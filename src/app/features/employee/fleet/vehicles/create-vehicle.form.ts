import { LucidePlus, LucideSettings, LucideVan } from '@lucide/angular';

import { defineForm } from '../../../shared/form';

import type { CreateVehicleFormModel } from './vehicle.model';

const VEHICLE_TYPE_OPTIONS = [
  { value: 'van', labelKey: 'forms.createVehicle.vehicleTypes.van' },
  { value: 'truck', labelKey: 'forms.createVehicle.vehicleTypes.truck' },
  { value: 'trailer', labelKey: 'forms.createVehicle.vehicleTypes.trailer' },
] as const;

const VEHICLE_STATUS_OPTIONS = [
  { value: 'active', labelKey: 'forms.createVehicle.statuses.active' },
  { value: 'maintenance', labelKey: 'forms.createVehicle.statuses.maintenance' },
  { value: 'retired', labelKey: 'forms.createVehicle.statuses.retired' },
] as const;

export const CreateVehicleForm = defineForm<CreateVehicleFormModel>()({
  mode: 'single',
  titleKey: 'forms.createVehicle.title',
  steps: [
    {
      id: 'main',
      titleKey: 'forms.createVehicle.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'identity',
          titleKey: 'forms.createVehicle.sections.identity.title',
          subtitleKey: 'forms.createVehicle.sections.identity.subtitle',
          icon: LucideVan,
          fields: [
            {
              key: 'plateNumber',
              type: 'text',
              labelKey: 'forms.createVehicle.fields.plateNumber',
              placeholderKey: 'forms.createVehicle.placeholders.plateNumber',
              colSpan: 2,
            },
            {
              key: 'make',
              type: 'text',
              labelKey: 'forms.createVehicle.fields.make',
              placeholderKey: 'forms.createVehicle.placeholders.make',
              colSpan: 2,
            },
            {
              key: 'model',
              type: 'text',
              labelKey: 'forms.createVehicle.fields.model',
              placeholderKey: 'forms.createVehicle.placeholders.model',
              colSpan: 2,
            },
            {
              key: 'year',
              type: 'number',
              labelKey: 'forms.createVehicle.fields.year',
              placeholderKey: 'forms.createVehicle.placeholders.year',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'specs',
          titleKey: 'forms.createVehicle.sections.specs.title',
          subtitleKey: 'forms.createVehicle.sections.specs.subtitle',
          icon: LucideSettings,
          fields: [
            {
              key: 'vehicleType',
              type: 'select',
              labelKey: 'forms.createVehicle.fields.vehicleType',
              placeholderKey: 'forms.createVehicle.placeholders.vehicleType',
              colSpan: 2,
              options: [...VEHICLE_TYPE_OPTIONS],
            },
            {
              key: 'capacityKg',
              type: 'number',
              labelKey: 'forms.createVehicle.fields.capacityKg',
              placeholderKey: 'forms.createVehicle.placeholders.capacityKg',
              colSpan: 2,
            },
            {
              key: 'status',
              type: 'select',
              labelKey: 'forms.createVehicle.fields.status',
              placeholderKey: 'forms.createVehicle.placeholders.status',
              colSpan: 2,
              options: [...VEHICLE_STATUS_OPTIONS],
            },
            {
              key: 'notes',
              type: 'textarea',
              labelKey: 'forms.createVehicle.fields.notes',
              placeholderKey: 'forms.createVehicle.placeholders.notes',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'forms.createVehicle.actions.create', icon: LucidePlus },
  },
});
