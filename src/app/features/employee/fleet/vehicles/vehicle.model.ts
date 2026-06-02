export interface CreateVehicleFormModel {
  plateNumber: string;
  make: string;
  model: string;
  year: number | null;
  vehicleType: string;
  capacityKg: number | null;
  status: string;
  notes: string;
}
