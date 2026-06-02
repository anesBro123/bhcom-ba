import type { CreateShipmentFormModel, ShipmentCostEstimate } from './create-shipment.model';

const PRIORITY_BASE: Record<string, number> = {
  standard: 15.99,
  express: 29.99,
  overnight: 49.99,
};

export function calculateShipmentCost(value: Partial<CreateShipmentFormModel>): ShipmentCostEstimate {
  const priority = value.deliveryPriority ?? 'standard';
  const baseShipping = PRIORITY_BASE[priority] ?? 15.99;

  const totalWeight = (value.items ?? []).reduce(
    (sum, item) => sum + (item.quantity ?? 0) * (item.weight ?? 0),
    0,
  );
  const weightCharge = totalWeight * 0.5;

  let servicesCharge = 0;
  if (value.insuranceCoverage) servicesCharge += 5;
  if (value.signatureRequired) servicesCharge += 3;
  if (value.fragileHandling) servicesCharge += 4;
  if (value.temperatureControl) servicesCharge += 8;

  const total = baseShipping + weightCharge + servicesCharge;

  return { baseShipping, weightCharge, servicesCharge, total };
}

export function formatAddressLine(
  company: string | undefined,
  address1: string | undefined,
  city: string | undefined,
  state: string | undefined,
  zip: string | undefined,
): string {
  const parts = [address1, [city, state].filter(Boolean).join(', '), zip].filter(Boolean);
  if (parts.length === 0) {
    return company || '—';
  }
  return parts.join(' · ');
}

export function shipmentTypeLabelKey(type: string | undefined): string {
  switch (type) {
    case 'document_envelope':
      return 'forms.createShipment.shipmentTypes.documentEnvelope';
    case 'freight_pallet':
      return 'forms.createShipment.shipmentTypes.freightPallet';
    case 'bulk_cargo':
      return 'forms.createShipment.shipmentTypes.bulkCargo';
    default:
      return 'forms.createShipment.shipmentTypes.standardPackage';
  }
}

export function priorityLabelKey(priority: string | undefined): string {
  switch (priority) {
    case 'express':
      return 'forms.createShipment.priority.express.title';
    case 'overnight':
      return 'forms.createShipment.priority.overnight.title';
    default:
      return 'forms.createShipment.priority.standard.title';
  }
}

export function packageTotals(value: Partial<CreateShipmentFormModel>): {
  totalItems: number;
  totalWeight: number;
  totalValue: number;
} {
  const items = value.items ?? [];
  return {
    totalItems: items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    totalWeight: items.reduce((sum, item) => sum + (item.quantity ?? 0) * (item.weight ?? 0), 0),
    totalValue: items.reduce((sum, item) => sum + (item.quantity ?? 0) * (item.value ?? 0), 0),
  };
}

export function selectedServicesLabels(value: Partial<CreateShipmentFormModel>): string[] {
  const labels: string[] = [];
  if (value.insuranceCoverage) labels.push('forms.createShipment.services.insuranceCoverage');
  if (value.signatureRequired) labels.push('forms.createShipment.services.signatureRequired');
  if (value.fragileHandling) labels.push('forms.createShipment.services.fragileHandling');
  if (value.temperatureControl) labels.push('forms.createShipment.services.temperatureControl');
  return labels;
}
