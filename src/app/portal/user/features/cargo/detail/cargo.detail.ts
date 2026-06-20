import { defineDetail } from '../../../../../shared/detail-modal';

import { CARGO_TYPE_OPTIONS, cargoSizeUnitLabelKey } from '../data/cargo.constants';
import type { Cargo } from '../data/cargo.model';

export const CargoDetail = defineDetail<Cargo>()({
  sections: [
    {
      id: 'shipment',
      titleKey: 'portal.user.features.cargo.detail.sections.shipment',
      fields: [
        {
          key: 'status',
          type: 'status',
          labelKey: 'portal.user.features.cargo.table.columns.status',
        },
        {
          key: 'cargoType',
          type: 'translate',
          labelKey: 'portal.user.features.cargo.form.fields.cargoType',
          options: CARGO_TYPE_OPTIONS,
        },
        {
          key: 'size',
          type: 'number',
          labelKey: 'portal.user.features.cargo.form.fields.size',
          suffixKeyFn: (cargo) => cargoSizeUnitLabelKey(cargo.cargoType, cargo.size),
        },
        {
          key: 'weightKg',
          type: 'number',
          labelKey: 'portal.user.features.cargo.form.fields.weightKg',
        },
        {
          key: 'neededByDate',
          type: 'date',
          labelKey: 'portal.user.features.cargo.form.fields.neededByDate',
        },
        {
          key: 'publishedAt',
          type: 'date',
          labelKey: 'portal.user.features.cargo.detail.fields.publishedAt',
        },
      ],
    },
    {
      id: 'route',
      titleKey: 'portal.user.features.cargo.detail.sections.route',
      fields: [
        {
          type: 'route',
          labelKey: 'portal.user.features.cargo.table.columns.route',
          originKey: 'origin',
          destinationKey: 'destination',
        },
        {
          key: 'description',
          type: 'text',
          labelKey: 'portal.user.features.cargo.form.fields.description',
        },
      ],
    },
  ],
});
