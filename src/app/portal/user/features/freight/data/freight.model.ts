import type { UserEntityStatus } from '../../../../../shared/constants/user-entity-status';

export type FreightType = 'pallet' | 'bulk' | 'refrigerated' | 'oversized' | 'other';

export interface FreightFormModel {
  origin: string;
  destination: string;
  neededByDate: string;
  size: number | null;
  weightKg: number | null;
  freightType: FreightType;
  description: string;
}

export interface Freight extends FreightFormModel {
  id: string;
  status: UserEntityStatus;
  publishedAt: string;
  companyId: string;
  publisherId: string;
}
