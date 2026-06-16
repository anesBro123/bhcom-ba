import { LucidePlus, LucideSettings, LucideVan } from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';

import type { CreateVehicleFormModel } from './vehicle.model';

const VEHICLE_TYPE_OPTIONS = [
  { value: 'van', labelKey: 'portal.user.features.fleet.vehicles.form.vehicleTypes.van' },
  { value: 'truck', labelKey: 'portal.user.features.fleet.vehicles.form.vehicleTypes.truck' },
  { value: 'trailer', labelKey: 'portal.user.features.fleet.vehicles.form.vehicleTypes.trailer' },
] as const;

const VEHICLE_STATUS_OPTIONS = [
  { value: 'active', labelKey: 'portal.user.features.fleet.vehicles.form.statuses.active' },
  { value: 'maintenance', labelKey: 'portal.user.features.fleet.vehicles.form.statuses.maintenance' },
  { value: 'retired', labelKey: 'portal.user.features.fleet.vehicles.form.statuses.retired' },
] as const;

export const CreateVehicleForm = defineForm<CreateVehicleFormModel>()({
  mode: 'single',
  titleKey: 'portal.user.features.fleet.vehicles.form.title',
  steps: [
    {
      id: 'main',
      titleKey: 'portal.user.features.fleet.vehicles.form.steps.main',
      kind: 'fields',
      sections: [
        {
          id: 'identity',
          titleKey: 'portal.user.features.fleet.vehicles.form.sections.identity.title',
          subtitleKey: 'portal.user.features.fleet.vehicles.form.sections.identity.subtitle',
          icon: LucideVan,
          fields: [
            {
              key: 'plateNumber',
              type: 'text',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.plateNumber',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.plateNumber',
              colSpan: 2,
            },
            {
              key: 'make',
              type: 'text',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.make',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.make',
              colSpan: 2,
            },
            {
              key: 'model',
              type: 'text',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.model',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.model',
              colSpan: 2,
            },
            {
              key: 'year',
              type: 'number',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.year',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.year',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'specs',
          titleKey: 'portal.user.features.fleet.vehicles.form.sections.specs.title',
          subtitleKey: 'portal.user.features.fleet.vehicles.form.sections.specs.subtitle',
          icon: LucideSettings,
          fields: [
            {
              key: 'vehicleType',
              type: 'select',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.vehicleType',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.vehicleType',
              colSpan: 2,
              options: [...VEHICLE_TYPE_OPTIONS],
            },
            {
              key: 'capacityKg',
              type: 'number',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.capacityKg',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.capacityKg',
              colSpan: 2,
            },
            {
              key: 'status',
              type: 'select',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.status',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.status',
              colSpan: 2,
              options: [...VEHICLE_STATUS_OPTIONS],
            },
            {
              key: 'notes',
              type: 'textarea',
              labelKey: 'portal.user.features.fleet.vehicles.form.fields.notes',
              placeholderKey: 'portal.user.features.fleet.vehicles.form.placeholders.notes',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    submit: { labelKey: 'portal.user.features.fleet.vehicles.form.actions.create', icon: LucidePlus },
  },
});
