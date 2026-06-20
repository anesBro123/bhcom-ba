import type { UserEntityStatus } from '../../../../../shared/constants/user-entity-status';

export interface WarehouseFormModel {
  warehouseId: string;
  availableFrom: string;
  availableTo: string;
  spaceM2: number | null;
  description: string;
}

export interface Warehouse extends WarehouseFormModel {
  id: string;
  warehouseLabel: string;
  warehouseName: string;
  warehouseCity: string;
  status: UserEntityStatus;
  publishedAt: string;
  companyId: string;
  publisherId: string;
}
