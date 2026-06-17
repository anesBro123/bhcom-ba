export interface RouteFormModel {
  vehicleId: string;
  origin: string;
  destination: string;
  transportDate: string;
  description: string;
}

export interface Route extends RouteFormModel {
  id: string;
  vehicleLabel: string;
  publishedAt: string;
}
