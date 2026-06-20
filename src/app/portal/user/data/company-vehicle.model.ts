import type { VehicleType } from '../../../shared/constants/vehicle-type';

export interface CompanyVehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  vehicleType: VehicleType;
}
