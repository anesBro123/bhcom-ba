import type { SelectOption } from '../../../../../shared/form';

export const US_STATE_OPTIONS: SelectOption[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export const PACKAGE_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'general', labelKey: 'portal.employee.features.shipments.form.categories.general' },
  { value: 'electronics', labelKey: 'portal.employee.features.shipments.form.categories.electronics' },
  { value: 'clothing', labelKey: 'portal.employee.features.shipments.form.categories.clothing' },
  { value: 'food', labelKey: 'portal.employee.features.shipments.form.categories.food' },
  { value: 'documents', labelKey: 'portal.employee.features.shipments.form.categories.documents' },
];

export const CARRIER_OPTIONS: SelectOption[] = [
  { value: 'fedex', labelKey: 'portal.employee.features.shipments.form.carriers.fedex' },
  { value: 'ups', labelKey: 'portal.employee.features.shipments.form.carriers.ups' },
  { value: 'dhl', labelKey: 'portal.employee.features.shipments.form.carriers.dhl' },
  { value: 'usps', labelKey: 'portal.employee.features.shipments.form.carriers.usps' },
];

export const SERVICE_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'ground', labelKey: 'portal.employee.features.shipments.form.serviceLevels.ground' },
  { value: 'express', labelKey: 'portal.employee.features.shipments.form.serviceLevels.express' },
  { value: 'overnight', labelKey: 'portal.employee.features.shipments.form.serviceLevels.overnight' },
];

export const DELIVERY_PRIORITY_OPTIONS = [
  {
    value: 'standard' as const,
    labelKey: 'portal.employee.features.shipments.form.priority.standard.title',
    descriptionKey: 'portal.employee.features.shipments.form.priority.standard.description',
    priceKey: 'portal.employee.features.shipments.form.priority.standard.price',
  },
  {
    value: 'express' as const,
    labelKey: 'portal.employee.features.shipments.form.priority.express.title',
    descriptionKey: 'portal.employee.features.shipments.form.priority.express.description',
    priceKey: 'portal.employee.features.shipments.form.priority.express.price',
  },
  {
    value: 'overnight' as const,
    labelKey: 'portal.employee.features.shipments.form.priority.overnight.title',
    descriptionKey: 'portal.employee.features.shipments.form.priority.overnight.description',
    priceKey: 'portal.employee.features.shipments.form.priority.overnight.price',
  },
];
