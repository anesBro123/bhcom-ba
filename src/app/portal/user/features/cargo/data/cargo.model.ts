import type { UserEntityStatus } from '../../../../../shared/constants/user-entity-status';

export type CargoType = 'pallet' | 'bulk' | 'refrigerated' | 'oversized' | 'other';

export interface CargoFormModel {
  origin: string;
  destination: string;
  neededByDate: string;
  size: string;
  weightKg: number | null;
  cargoType: CargoType;
  description: string;
}

export interface Cargo extends CargoFormModel {
  id: string;
  status: UserEntityStatus;
  publishedAt: string;
  companyId: string;
  publisherId: string;
}
