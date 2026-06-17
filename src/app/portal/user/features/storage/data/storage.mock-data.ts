import type { Storage } from './storage.model';

export const STORAGE_MOCK_DATA: Storage[] = [
  {
    id: 'storage-001',
    warehouseId: 'wh-001',
    warehouseLabel: 'Central Distribution Hub — Sarajevo',
    availableFrom: '2026-07-01',
    availableTo: '2026-09-30',
    spaceM2: 450,
    description: 'Climate-controlled section near loading ramp.',
    status: 'open',
    publishedAt: '2026-06-08T11:00:00.000Z',
  },
  {
    id: 'storage-002',
    warehouseId: 'wh-002',
    warehouseLabel: 'North Yard Storage — Banja Luka',
    availableFrom: '2026-06-17',
    availableTo: '2026-08-15',
    spaceM2: 1200,
    description: 'Open yard space for bulk goods.',
    status: 'in_progress',
    publishedAt: '2026-06-12T16:45:00.000Z',
  },
];
