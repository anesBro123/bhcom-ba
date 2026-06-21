import { defineDetail } from '../../../../../shared/detail';

import { FREIGHT_TYPE_OPTIONS, freightSizeUnitLabelKey } from '../data/freight.constants';
import type { Freight } from '../data/freight.model';

export const FreightDetail = defineDetail<Freight>()({
  sections: [
    {
      id: 'shipment',
      titleKey: 'portal.user.features.freight.detail.sections.shipment',
      fields: [
        {
          key: 'freightType',
          type: 'translate',
          labelKey: 'portal.user.features.freight.form.fields.freightType',
          options: FREIGHT_TYPE_OPTIONS,
        },
        {
          key: 'size',
          type: 'number',
          labelKey: 'portal.user.features.freight.form.fields.size',
          suffixKeyFn: (cargo) => freightSizeUnitLabelKey(cargo.freightType, cargo.size),
        },
        {
          key: 'weightKg',
          type: 'number',
          labelKey: 'portal.user.features.freight.form.fields.weightKg',
        },
        {
          key: 'neededByDate',
          type: 'date',
          labelKey: 'portal.user.features.freight.form.fields.neededByDate',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.freight.detail.fields.publishedAt',
        },
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.freight.form.fields.description',
        },
      ],
    },
  ],
});
