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
  publishedAt: string;
}
