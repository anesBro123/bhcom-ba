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
      titleKey: 'forms.createShipment.steps.type',
      kind: 'fields',
      sections: [
        {
          id: 'shipmentType',
          titleKey: 'forms.createShipment.sections.type.title',
          subtitleKey: 'forms.createShipment.sections.type.subtitle',
          icon: LucidePackage,
          fields: [
            {
              key: 'shipmentType',
              type: 'radio',
              labelKey: 'forms.createShipment.fields.shipmentType',
              colSpan: 'full',
              options: [
                { value: 'standard_package', labelKey: 'forms.createShipment.shipmentTypes.standardPackage' },
                { value: 'document_envelope', labelKey: 'forms.createShipment.shipmentTypes.documentEnvelope' },
                { value: 'freight_pallet', labelKey: 'forms.createShipment.shipmentTypes.freightPallet' },
                { value: 'bulk_cargo', labelKey: 'forms.createShipment.shipmentTypes.bulkCargo' },
              ],
            },
            {
              key: 'deliveryPriority',
              type: 'custom',
              labelKey: 'forms.createShipment.fields.deliveryPriority',
              colSpan: 'full',
            },
            {
              key: 'pickupDate',
              type: 'date',
              labelKey: 'forms.createShipment.fields.pickupDate',
              placeholderKey: 'forms.createShipment.placeholders.pickupDate',
              colSpan: 2,
            },
            {
              key: 'deliveryDate',
              type: 'date',
              labelKey: 'forms.createShipment.fields.deliveryDate',
              placeholderKey: 'forms.createShipment.placeholders.deliveryDate',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'addresses',
      titleKey: 'forms.createShipment.steps.addresses',
      kind: 'fields',
      sections: [
        {
          id: 'origin',
          titleKey: 'forms.createShipment.sections.origin.title',
          subtitleKey: 'forms.createShipment.sections.origin.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'originCompany',
              type: 'text',
              labelKey: 'forms.createShipment.fields.companyName',
              placeholderKey: 'forms.createShipment.placeholders.companyName',
              colSpan: 2,
            },
            {
              key: 'originContact',
              type: 'text',
              labelKey: 'forms.createShipment.fields.contactName',
              placeholderKey: 'forms.createShipment.placeholders.contactName',
              colSpan: 2,
            },
            {
              key: 'originAddress1',
              type: 'text',
              labelKey: 'forms.createShipment.fields.addressLine1',
              placeholderKey: 'forms.createShipment.placeholders.addressLine1',
              colSpan: 'full',
            },
            {
              key: 'originAddress2',
              type: 'text',
              labelKey: 'forms.createShipment.fields.addressLine2',
              placeholderKey: 'forms.createShipment.placeholders.addressLine2',
              colSpan: 'full',
            },
            {
              key: 'originCity',
              type: 'text',
              labelKey: 'forms.createShipment.fields.city',
              placeholderKey: 'forms.createShipment.placeholders.city',
              colSpan: 1,
            },
            {
              key: 'originState',
              type: 'select',
              labelKey: 'forms.createShipment.fields.state',
              placeholderKey: 'forms.createShipment.placeholders.state',
              options: US_STATE_OPTIONS,
              colSpan: 1,
            },
            {
              key: 'originZip',
              type: 'text',
              labelKey: 'forms.createShipment.fields.zip',
              placeholderKey: 'forms.createShipment.placeholders.zip',
              colSpan: 1,
            },
            {
              key: 'originPhone',
              type: 'tel',
              labelKey: 'forms.createShipment.fields.phone',
              placeholderKey: 'forms.createShipment.placeholders.phone',
              colSpan: 2,
            },
            {
              key: 'originEmail',
              type: 'email',
              labelKey: 'forms.createShipment.fields.email',
              placeholderKey: 'forms.createShipment.placeholders.email',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'destination',
          titleKey: 'forms.createShipment.sections.destination.title',
          subtitleKey: 'forms.createShipment.sections.destination.subtitle',
          icon: LucideMapPin,
          fields: [
            {
              key: 'destinationCompany',
              type: 'text',
              labelKey: 'forms.createShipment.fields.companyName',
              placeholderKey: 'forms.createShipment.placeholders.companyName',
              colSpan: 2,
            },
            {
              key: 'destinationContact',
              type: 'text',
              labelKey: 'forms.createShipment.fields.contactName',
              placeholderKey: 'forms.createShipment.placeholders.contactName',
              colSpan: 2,
            },
            {
              key: 'destinationAddress1',
              type: 'text',
              labelKey: 'forms.createShipment.fields.addressLine1',
              placeholderKey: 'forms.createShipment.placeholders.addressLine1',
              colSpan: 'full',
            },
            {
              key: 'destinationAddress2',
              type: 'text',
              labelKey: 'forms.createShipment.fields.addressLine2',
              placeholderKey: 'forms.createShipment.placeholders.addressLine2',
              colSpan: 'full',
            },
            {
              key: 'destinationCity',
              type: 'text',
              labelKey: 'forms.createShipment.fields.city',
              placeholderKey: 'forms.createShipment.placeholders.city',
              colSpan: 1,
            },
            {
              key: 'destinationState',
              type: 'select',
              labelKey: 'forms.createShipment.fields.state',
              placeholderKey: 'forms.createShipment.placeholders.state',
              options: US_STATE_OPTIONS,
              colSpan: 1,
            },
            {
              key: 'destinationZip',
              type: 'text',
              labelKey: 'forms.createShipment.fields.zip',
              placeholderKey: 'forms.createShipment.placeholders.zip',
              colSpan: 1,
            },
            {
              key: 'destinationPhone',
              type: 'tel',
              labelKey: 'forms.createShipment.fields.phone',
              placeholderKey: 'forms.createShipment.placeholders.phone',
              colSpan: 2,
            },
            {
              key: 'destinationEmail',
              type: 'email',
              labelKey: 'forms.createShipment.fields.email',
              placeholderKey: 'forms.createShipment.placeholders.email',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'packages',
      titleKey: 'forms.createShipment.steps.packages',
      kind: 'fields',
      validate: validatePackageItems,
      sections: [
        {
          id: 'items',
          titleKey: 'forms.createShipment.sections.packages.title',
          subtitleKey: 'forms.createShipment.sections.packages.subtitle',
          icon: LucideBox,
          kind: 'template',
        },
      ],
    },
    {
      id: 'services',
      titleKey: 'forms.createShipment.steps.services',
      kind: 'fields',
      sections: [
        {
          id: 'options',
          titleKey: 'forms.createShipment.sections.services.title',
          subtitleKey: 'forms.createShipment.sections.services.subtitle',
          icon: LucideShield,
          kind: 'template',
        },
      ],
    },
    {
      id: 'review',
      titleKey: 'forms.createShipment.steps.review',
      kind: 'template',
    },
  ],
  actions: {
    previous: { labelKey: 'forms.common.previous' },
    next: { labelKey: 'forms.common.next' },
    submit: { labelKey: 'forms.createShipment.actions.create', icon: LucideSend },
  },
});
