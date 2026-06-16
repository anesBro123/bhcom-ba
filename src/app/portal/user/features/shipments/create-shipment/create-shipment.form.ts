import type { FormArray, FormGroup } from '@angular/forms';
import {
  LucideBox,
  LucideMapPin,
  LucidePackage,
  LucideSend,
  LucideShield,
} from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';

import { US_STATE_OPTIONS } from './create-shipment.constants';
import type { CreateShipmentFormModel } from './create-shipment.model';

function validatePackageItems(form: FormGroup): boolean {
  const items = form.get('items') as FormArray | null;
  if (!items || items.length === 0) {
    return false;
  }

  let valid = true;
  for (const control of items.controls) {
    control.markAllAsTouched();
    if (control.invalid) {
      valid = false;
    }
  }

  return valid;
}

export const CreateShipmentForm = defineForm<CreateShipmentFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'type',
      titleKey: 'portal.user.features.shipments.form.steps.type',
      kind: 'fields',
      sections: [
        {
          id: 'shipmentType',
          titleKey: 'portal.user.features.shipments.form.sections.type.title',
          subtitleKey: 'portal.user.features.shipments.form.sections.type.subtitle',
          icon: LucidePackage,
          fields: [
            {
              key: 'shipmentType',
              type: 'radio',
              labelKey: 'portal.user.features.shipments.form.fields.shipmentType',
              colSpan: 'full',
              options: [
                { value: 'standard_package', labelKey: 'portal.user.features.shipments.form.shipmentTypes.standardPackage' },
                { value: 'document_envelope', labelKey: 'portal.user.features.shipments.form.shipmentTypes.documentEnvelope' },
                { value: 'freight_pallet', labelKey: 'portal.user.features.shipments.form.shipmentTypes.freightPallet' },
                { value: 'bulk_cargo', labelKey: 'portal.user.features.shipments.form.shipmentTypes.bulkCargo' },
              ],
            },
            {
              key: 'deliveryPriority',
              type: 'custom',
              labelKey: 'portal.user.features.shipments.form.fields.deliveryPriority',
              colSpan: 'full',
            },
            {
              key: 'pickupDate',
              type: 'date',
              labelKey: 'portal.user.features.shipments.form.fields.pickupDate',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.pickupDate',
              colSpan: 2,
            },
            {
              key: 'deliveryDate',
              type: 'date',
              labelKey: 'portal.user.features.shipments.form.fields.deliveryDate',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.deliveryDate',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'addresses',
      titleKey: 'portal.user.features.shipments.form.steps.addresses',
      kind: 'fields',
      sections: [
        {
          id: 'origin',
          titleKey: 'portal.user.features.shipments.form.sections.origin.title',
          subtitleKey: 'portal.user.features.shipments.form.sections.origin.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'originCompany',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.companyName',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.companyName',
              colSpan: 2,
            },
            {
              key: 'originContact',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.contactName',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.contactName',
              colSpan: 2,
            },
            {
              key: 'originAddress1',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.addressLine1',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.addressLine1',
              colSpan: 'full',
            },
            {
              key: 'originAddress2',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.addressLine2',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.addressLine2',
              colSpan: 'full',
            },
            {
              key: 'originCity',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.city',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.city',
              colSpan: 1,
            },
            {
              key: 'originState',
              type: 'select',
              labelKey: 'portal.user.features.shipments.form.fields.state',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.state',
              options: US_STATE_OPTIONS,
              colSpan: 1,
            },
            {
              key: 'originZip',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.zip',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.zip',
              colSpan: 1,
            },
            {
              key: 'originPhone',
              type: 'tel',
              labelKey: 'portal.user.features.shipments.form.fields.phone',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.phone',
              colSpan: 2,
            },
            {
              key: 'originEmail',
              type: 'email',
              labelKey: 'portal.user.features.shipments.form.fields.email',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.email',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'destination',
          titleKey: 'portal.user.features.shipments.form.sections.destination.title',
          subtitleKey: 'portal.user.features.shipments.form.sections.destination.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'destinationCompany',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.companyName',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.companyName',
              colSpan: 2,
            },
            {
              key: 'destinationContact',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.contactName',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.contactName',
              colSpan: 2,
            },
            {
              key: 'destinationAddress1',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.addressLine1',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.addressLine1',
              colSpan: 'full',
            },
            {
              key: 'destinationAddress2',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.addressLine2',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.addressLine2',
              colSpan: 'full',
            },
            {
              key: 'destinationCity',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.city',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.city',
              colSpan: 1,
            },
            {
              key: 'destinationState',
              type: 'select',
              labelKey: 'portal.user.features.shipments.form.fields.state',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.state',
              options: US_STATE_OPTIONS,
              colSpan: 1,
            },
            {
              key: 'destinationZip',
              type: 'text',
              labelKey: 'portal.user.features.shipments.form.fields.zip',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.zip',
              colSpan: 1,
            },
            {
              key: 'destinationPhone',
              type: 'tel',
              labelKey: 'portal.user.features.shipments.form.fields.phone',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.phone',
              colSpan: 2,
            },
            {
              key: 'destinationEmail',
              type: 'email',
              labelKey: 'portal.user.features.shipments.form.fields.email',
              placeholderKey: 'portal.user.features.shipments.form.placeholders.email',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'packages',
      titleKey: 'portal.user.features.shipments.form.steps.packages',
      kind: 'fields',
      validate: validatePackageItems,
      sections: [
        {
          id: 'items',
          titleKey: 'portal.user.features.shipments.form.sections.packages.title',
          subtitleKey: 'portal.user.features.shipments.form.sections.packages.subtitle',
          icon: LucideBox,
          kind: 'template',
        },
      ],
    },
    {
      id: 'services',
      titleKey: 'portal.user.features.shipments.form.steps.services',
      kind: 'fields',
      sections: [
        {
          id: 'options',
          titleKey: 'portal.user.features.shipments.form.sections.services.title',
          subtitleKey: 'portal.user.features.shipments.form.sections.services.subtitle',
          icon: LucideShield,
          kind: 'template',
        },
      ],
    },
    {
      id: 'review',
      titleKey: 'portal.user.features.shipments.form.steps.review',
      kind: 'template',
    },
  ],
  actions: {
    previous: { labelKey: 'shared.form.common.previous' },
    next: { labelKey: 'shared.form.common.next' },
    submit: { labelKey: 'portal.user.features.shipments.form.actions.create', icon: LucideSend },
  },
});
