import {
  LucideMapPin,
  LucidePlus,
  LucideRuler,
  LucideSave,
  LucideShield,
  LucideWarehouse,
} from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';

import { WAREHOUSE_TYPE_OPTIONS } from '../data/warehouse.constants';
import type { WarehouseFormModel } from '../data/warehouse.model';

export const AdminWarehouseForm = defineForm<WarehouseFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'identity',
      titleKey: 'portal.admin.features.warehouses.form.steps.identity',
      kind: 'fields',
      sections: [
        {
          id: 'identity',
          titleKey: 'portal.admin.features.warehouses.form.sections.identity.title',
          subtitleKey: 'portal.admin.features.warehouses.form.sections.identity.subtitle',
          icon: LucideWarehouse,
          fields: [
            {
              key: 'name',
              type: 'text',
              labelKey: 'portal.admin.features.warehouses.form.fields.name',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.name',
              colSpan: 2,
            },
            {
              key: 'type',
              type: 'select',
              labelKey: 'portal.admin.features.warehouses.form.fields.type',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.type',
              colSpan: 2,
              options: [...WAREHOUSE_TYPE_OPTIONS],
            },
          ],
        },
        {
          id: 'location',
          titleKey: 'portal.admin.features.warehouses.form.sections.location.title',
          subtitleKey: 'portal.admin.features.warehouses.form.sections.location.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'address',
              type: 'textarea',
              labelKey: 'portal.admin.features.warehouses.form.fields.address',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.address',
              colSpan: 'full',
              rows: 2,
            },
            {
              key: 'city',
              type: 'text',
              labelKey: 'portal.admin.features.warehouses.form.fields.city',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.city',
              colSpan: 2,
            },
            {
              key: 'country',
              type: 'text',
              labelKey: 'portal.admin.features.warehouses.form.fields.country',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.country',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'capacity',
      titleKey: 'portal.admin.features.warehouses.form.steps.capacity',
      kind: 'fields',
      sections: [
        {
          id: 'capacity',
          titleKey: 'portal.admin.features.warehouses.form.sections.capacity.title',
          subtitleKey: 'portal.admin.features.warehouses.form.sections.capacity.subtitle',
          icon: LucideRuler,
          fields: [
            {
              key: 'capacityM2',
              type: 'number',
              labelKey: 'portal.admin.features.warehouses.form.fields.capacityM2',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.capacityM2',
              colSpan: 2,
            },
            {
              key: 'height',
              type: 'number',
              labelKey: 'portal.admin.features.warehouses.form.fields.height',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.height',
              colSpan: 2,
            },
            {
              key: 'floorCount',
              type: 'number',
              labelKey: 'portal.admin.features.warehouses.form.fields.floorCount',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.floorCount',
              colSpan: 2,
            },
            {
              key: 'rackCount',
              type: 'number',
              labelKey: 'portal.admin.features.warehouses.form.fields.rackCount',
              placeholderKey: 'portal.admin.features.warehouses.form.placeholders.rackCount',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'facilities',
      titleKey: 'portal.admin.features.warehouses.form.steps.facilities',
      kind: 'fields',
      sections: [
        {
          id: 'facilities',
          titleKey: 'portal.admin.features.warehouses.form.sections.facilities.title',
          subtitleKey: 'portal.admin.features.warehouses.form.sections.facilities.subtitle',
          icon: LucideShield,
          fields: [
            {
              key: 'enclosed',
              type: 'toggle',
              labelKey: 'portal.admin.features.warehouses.form.fields.enclosed',
              colSpan: 2,
            },
            {
              key: 'cameras',
              type: 'toggle',
              labelKey: 'portal.admin.features.warehouses.form.fields.cameras',
              colSpan: 2,
            },
            {
              key: 'ramp',
              type: 'toggle',
              labelKey: 'portal.admin.features.warehouses.form.fields.ramp',
              colSpan: 2,
            },
            {
              key: 'physicalSecurity',
              type: 'toggle',
              labelKey: 'portal.admin.features.warehouses.form.fields.physicalSecurity',
              colSpan: 2,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'shared.form.common.previous' },
    next: { labelKey: 'shared.form.common.next' },
    submit: { labelKey: 'portal.admin.features.warehouses.form.actions.create', icon: LucidePlus },
  },
});

export const AdminWarehouseFormEditActions = {
  submit: { labelKey: 'portal.admin.features.warehouses.form.actions.update', icon: LucideSave },
};
