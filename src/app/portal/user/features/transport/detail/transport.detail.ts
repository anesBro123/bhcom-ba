import { defineDetail } from '../../../../../shared/detail';

import type { Transport } from '../data/transport.model';

export const TransportDetail = defineDetail<Transport>()({
  sections: [
    {
      id: 'schedule',
      titleKey: 'portal.user.features.transport.detail.sections.schedule',
      fields: [
        {
          key: 'transportStartDate',
          type: 'date',
          labelKey: 'portal.user.features.transport.form.fields.transportStartDate',
        },
        {
          key: 'transportEndDate',
          type: 'date',
          labelKey: 'portal.user.features.transport.form.fields.transportEndDate',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.transport.detail.fields.publishedAt',
        },
      ],
    },
    {
      id: 'vehicle',
      titleKey: 'portal.user.features.transport.detail.sections.vehicle',
      fields: [
        {
          type: 'vehicle',
          labelKey: 'portal.user.features.transport.table.columns.vehicle',
          nameKey: 'vehicleName',
          plateKey: 'vehiclePlate',
        },
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.transport.form.fields.description',
        },
      ],
    },
  ],
});
