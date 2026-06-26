import { defineDetail } from '../../../../../shared/detail';

import { WAREHOUSE_TYPE_OPTIONS } from '../data/warehouse.constants';
import type { Warehouse } from '../data/warehouse.model';

const BOOLEAN_DETAIL_OPTIONS = [
  { value: 'true', labelKey: 'shared.common.booleanYes' },
  { value: 'false', labelKey: 'shared.common.booleanNo' },
] as const;

export const WarehouseDetail = defineDetail<Warehouse>()({
  sections: [
    {
      id: 'identity',
      titleKey: 'portal.admin.features.warehouses.form.steps.identity',
      fields: [
        {
          key: 'type',
          type: 'translate',
          labelKey: 'portal.admin.features.warehouses.form.fields.type',
          options: [...WAREHOUSE_TYPE_OPTIONS],
        },
      ],
    },
    {
      id: 'location',
      titleKey: 'portal.admin.features.warehouses.form.sections.location.title',
      fields: [
        {
          key: 'address',
          type: 'text',
          labelKey: 'portal.admin.features.warehouses.form.fields.address',
        },
        {
          key: 'country',
          type: 'text',
          labelKey: 'portal.admin.features.warehouses.form.fields.country',
        },
      ],
    },
    {
      id: 'capacity',
      titleKey: 'portal.admin.features.warehouses.form.steps.capacity',
      fields: [
        {
          key: 'capacityM2',
          type: 'number',
          labelKey: 'portal.admin.features.warehouses.form.fields.capacityM2',
        },
        {
          key: 'height',
          type: 'number',
          labelKey: 'portal.admin.features.warehouses.form.fields.height',
        },
        {
          key: 'floorCount',
          type: 'number',
          labelKey: 'portal.admin.features.warehouses.form.fields.floorCount',
        },
        {
          key: 'rackCount',
          type: 'number',
          labelKey: 'portal.admin.features.warehouses.form.fields.rackCount',
        },
      ],
    },
    {
      id: 'facilities',
      titleKey: 'portal.admin.features.warehouses.form.steps.facilities',
      fields: [
        {
          key: 'enclosed',
          type: 'translate',
          labelKey: 'portal.admin.features.warehouses.form.fields.enclosed',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
        {
          key: 'cameras',
          type: 'translate',
          labelKey: 'portal.admin.features.warehouses.form.fields.cameras',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
        {
          key: 'ramp',
          type: 'translate',
          labelKey: 'portal.admin.features.warehouses.form.fields.ramp',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
        {
          key: 'physicalSecurity',
          type: 'translate',
          labelKey: 'portal.admin.features.warehouses.form.fields.physicalSecurity',
          options: [...BOOLEAN_DETAIL_OPTIONS],
        },
      ],
    },
  ],
});
