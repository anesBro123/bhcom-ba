export interface WarehouseFormModel {
  name: string;
  address: string;
  city: string;
  country: string;
  capacityM2: number | null;
  type: WarehouseType;
  height: number | null;
  enclosed: boolean;
  cameras: boolean;
  ramp: boolean;
  physicalSecurity: boolean;
  floorCount: number | null;
  rackCount: number | null;
}

export interface Warehouse extends WarehouseFormModel {
  id: string;
}

export type WarehouseType = 'open' | 'closed';
