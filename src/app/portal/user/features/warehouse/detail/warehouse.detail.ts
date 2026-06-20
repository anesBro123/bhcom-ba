import { defineDetail } from '../../../../../shared/detail-modal';

import type { Warehouse } from '../data/warehouse.model';

export const WarehouseDetail = defineDetail<Warehouse>()({
  sections: [
    {
      id: 'availability',
      titleKey: 'portal.user.features.warehouse.detail.sections.availability',
      fields: [
        {
          key: 'status',
          type: 'status',
          labelKey: 'portal.user.features.warehouse.table.columns.status',
        },
        {
          type: 'warehouse',
          labelKey: 'portal.user.features.warehouse.table.columns.warehouse',
          nameKey: 'warehouseName',
          cityKey: 'warehouseCity',
        },
        {
          key: 'availableFrom',
          type: 'date',
          labelKey: 'portal.user.features.warehouse.form.fields.availableFrom',
        },
        {
          key: 'availableTo',
          type: 'date',
          labelKey: 'portal.user.features.warehouse.form.fields.availableTo',
        },
        {
          key: 'spaceM2',
          type: 'number',
          labelKey: 'portal.user.features.warehouse.form.fields.spaceM2',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.warehouse.detail.fields.publishedAt',
        },
      ],
    },
    {
      id: 'details',
      titleKey: 'portal.user.features.warehouse.detail.sections.details',
      fields: [
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.warehouse.form.fields.description',
        },
      ],
    },
  ],
});
