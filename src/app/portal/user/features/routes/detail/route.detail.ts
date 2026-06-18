import { defineDetail } from '../../../../../shared/detail-modal';

import type { Route } from '../data/route.model';

export const RouteDetail = defineDetail<Route>()({
  sections: [
    {
      id: 'schedule',
      titleKey: 'portal.user.features.routes.detail.sections.schedule',
      fields: [
        {
          key: 'status',
          type: 'status',
          labelKey: 'portal.user.features.routes.table.columns.status',
        },
        {
          key: 'transportStartDate',
          type: 'date',
          labelKey: 'portal.user.features.routes.form.fields.transportStartDate',
        },
        {
          key: 'transportEndDate',
          type: 'date',
          labelKey: 'portal.user.features.routes.form.fields.transportEndDate',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.routes.detail.fields.publishedAt',
        },
      ],
    },
    {
      id: 'route',
      titleKey: 'portal.user.features.routes.detail.sections.route',
      fields: [
        {
          type: 'route',
          labelKey: 'portal.user.features.routes.table.columns.route',
          originKey: 'origin',
          destinationKey: 'destination',
        },
        {
          type: 'vehicle',
          labelKey: 'portal.user.features.routes.table.columns.vehicle',
          nameKey: 'vehicleName',
          plateKey: 'vehiclePlate',
        },
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.routes.form.fields.description',
        },
      ],
    },
  ],
});
