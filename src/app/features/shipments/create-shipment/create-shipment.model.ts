export type ShipmentTypeOption = 'standard_package' | 'document_envelope' | 'freight_pallet' | 'bulk_cargo';

export type DeliveryPriorityOption = 'standard' | 'express' | 'overnight';

export interface PackageItem {
  description: string;
  category: string;
  quantity: number;
  weight: number;
  value: number;
  hazardous: boolean;
  length: number;
  width: number;
  height: number;
}

export interface CreateShipmentFormModel {
  shipmentType: ShipmentTypeOption;
  deliveryPriority: DeliveryPriorityOption;
  pickupDate: string;
  deliveryDate: string;

  originCompany: string;
  originContact: string;
  originAddress1: string;
  originAddress2: string;
  originCity: string;
  originState: string;
  originZip: string;
  originPhone: string;
  originEmail: string;

  destinationCompany: string;
  destinationContact: string;
  destinationAddress1: string;
  destinationAddress2: string;
  destinationCity: string;
  destinationState: string;
  destinationZip: string;
  destinationPhone: string;
  destinationEmail: string;

  insuranceCoverage: boolean;
  signatureRequired: boolean;
  fragileHandling: boolean;
  temperatureControl: boolean;
  preferredCarrier: string;
  serviceLevel: string;
  specialInstructions: string;

  items: PackageItem[];
}

export interface ShipmentCostEstimate {
  baseShipping: number;
  weightCharge: number;
  servicesCharge: number;
  total: number;
}
