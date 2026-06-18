import { defineDetail } from '../../../../../shared/detail-modal';

import type { Storage } from '../data/storage.model';

export const StorageDetail = defineDetail<Storage>()({
  sections: [
    {
      id: 'availability',
      titleKey: 'portal.user.features.storage.detail.sections.availability',
      fields: [
        {
          key: 'status',
          type: 'status',
          labelKey: 'portal.user.features.storage.table.columns.status',
        },
        {
          key: 'warehouseLabel',
          type: 'text',
          labelKey: 'portal.user.features.storage.table.columns.warehouse',
        },
        {
          key: 'availableFrom',
          type: 'date',
          labelKey: 'portal.user.features.storage.form.fields.availableFrom',
        },
        {
          key: 'availableTo',
          type: 'date',
          labelKey: 'portal.user.features.storage.form.fields.availableTo',
        },
        {
          key: 'spaceM2',
          type: 'number',
          labelKey: 'portal.user.features.storage.form.fields.spaceM2',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.storage.detail.fields.publishedAt',
        },
      ],
    },
    {
      id: 'details',
      titleKey: 'portal.user.features.storage.detail.sections.details',
      fields: [
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.storage.form.fields.description',
        },
      ],
    },
  ],
});
