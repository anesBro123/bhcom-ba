export type ShipmentStatus = 'in_transit' | 'pending' | 'delivered';
export type ShipmentType = 'road' | 'air' | 'sea';
export type ShipmentPriority = 'standard' | 'express' | 'economy';

export interface Shipment {
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  departure: string;
  eta: string;
  status: ShipmentStatus;
  type: ShipmentType;
  priority: ShipmentPriority;
}
