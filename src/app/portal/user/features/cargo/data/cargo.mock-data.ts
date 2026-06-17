import type { Cargo } from './cargo.model';

export const CARGO_MOCK_DATA: Cargo[] = [
  {
    id: 'cargo-001',
    origin: 'Sarajevo',
    destination: 'Mostar',
    neededByDate: '2026-06-25',
    size: '4 pallets',
    weightKg: 1200,
    cargoType: 'pallet',
    description: 'Building materials, forklift required at delivery.',
    status: 'closed',
    publishedAt: '2026-06-09T14:00:00.000Z',
  },
  {
    id: 'cargo-002',
    origin: 'Tuzla',
    destination: 'Zagreb',
    neededByDate: '2026-06-28',
    size: '12 m³',
    weightKg: 800,
    cargoType: 'refrigerated',
    description: 'Temperature-controlled food products.',
    status: 'canceled',
    publishedAt: '2026-06-10T09:15:00.000Z',
  },
];
