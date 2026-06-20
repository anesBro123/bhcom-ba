import type { UserEntityStatus } from '../../../../../shared/constants/user-entity-status';
import type { VehicleType } from '../../../../../shared/constants/vehicle-type';

export interface RouteFormModel {
  vehicleId: string;
  origin: string;
  destination: string;
  transportStartDate: string;
  transportEndDate: string;
  description: string;
}

export interface Route extends RouteFormModel {
  id: string;
  vehiclePlate: string;
  vehicleName: string;
  vehicleType: VehicleType;
  status: UserEntityStatus;
  publishedAt: string;
  companyId: string;
  publisherId: string;
}
