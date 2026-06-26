import {
  LucideLayoutGrid,
  LucideListChecks,
  LucidePackage,
  LucideTruck,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

export const UserPageIcons = {
  marketplace: LucideLayoutGrid,
  ourListings: LucideListChecks,
  transport: LucideTruck,
  freight: LucidePackage,
  warehouse: LucideWarehouse,
} as const satisfies Record<string, LucideIcon>;
