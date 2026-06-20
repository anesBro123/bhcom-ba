import { defineDetail } from '../../../../../shared/detail-modal';

import type { Transport } from '../data/transport.model';

export const TransportDetail = defineDetail<Transport>()({
  sections: [
    {
      id: 'schedule',
      titleKey: 'portal.user.features.transport.detail.sections.schedule',
      fields: [
        {
          key: 'status',
          type: 'status',
          labelKey: 'portal.user.features.transport.table.columns.status',
        },
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
      id: 'route',
      titleKey: 'portal.user.features.transport.detail.sections.route',
      fields: [
        {
          type: 'route',
          labelKey: 'portal.user.features.transport.table.columns.route',
          originKey: 'origin',
          destinationKey: 'destination',
        },
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
