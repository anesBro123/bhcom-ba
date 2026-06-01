import type { SelectOption } from '../../../core/form';

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
  { value: 'general', labelKey: 'forms.createShipment.categories.general' },
  { value: 'electronics', labelKey: 'forms.createShipment.categories.electronics' },
  { value: 'clothing', labelKey: 'forms.createShipment.categories.clothing' },
  { value: 'food', labelKey: 'forms.createShipment.categories.food' },
  { value: 'documents', labelKey: 'forms.createShipment.categories.documents' },
];

export const CARRIER_OPTIONS: SelectOption[] = [
  { value: 'fedex', labelKey: 'forms.createShipment.carriers.fedex' },
  { value: 'ups', labelKey: 'forms.createShipment.carriers.ups' },
  { value: 'dhl', labelKey: 'forms.createShipment.carriers.dhl' },
  { value: 'usps', labelKey: 'forms.createShipment.carriers.usps' },
];

export const SERVICE_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'ground', labelKey: 'forms.createShipment.serviceLevels.ground' },
  { value: 'express', labelKey: 'forms.createShipment.serviceLevels.express' },
  { value: 'overnight', labelKey: 'forms.createShipment.serviceLevels.overnight' },
];

export const DELIVERY_PRIORITY_OPTIONS = [
  {
    value: 'standard' as const,
    labelKey: 'forms.createShipment.priority.standard.title',
    descriptionKey: 'forms.createShipment.priority.standard.description',
    priceKey: 'forms.createShipment.priority.standard.price',
  },
  {
    value: 'express' as const,
    labelKey: 'forms.createShipment.priority.express.title',
    descriptionKey: 'forms.createShipment.priority.express.description',
    priceKey: 'forms.createShipment.priority.express.price',
  },
  {
    value: 'overnight' as const,
    labelKey: 'forms.createShipment.priority.overnight.title',
    descriptionKey: 'forms.createShipment.priority.overnight.description',
    priceKey: 'forms.createShipment.priority.overnight.price',
  },
];
