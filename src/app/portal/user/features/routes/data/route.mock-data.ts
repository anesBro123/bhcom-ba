import type { Route } from './route.model';

export const ROUTE_MOCK_DATA: Route[] = [
  {
    id: 'ro-001',
    vehicleId: 'veh-001',
    vehiclePlate: 'BG-123-AA',
    vehicleName: 'Mercedes-Benz Sprinter',
    origin: 'Sarajevo',
    destination: 'Banja Luka',
    transportStartDate: '2026-06-20',
    transportEndDate: '2026-06-20',
    description: 'Return trip with available cargo space.',
    publishedAt: '2026-06-10T08:00:00.000Z',
  },
  {
    id: 'ro-002',
    vehicleId: 'veh-002',
    vehiclePlate: 'NS-456-BB',
    vehicleName: 'Iveco Daily',
    origin: 'Novi Sad',
    destination: 'Beograd',
    transportStartDate: '2026-06-20',
    transportEndDate: '2026-06-22',
    description: 'Morning departure, pallet space available.',
    publishedAt: '2026-06-11T10:30:00.000Z',
  },
];
