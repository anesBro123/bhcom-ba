import {
  LucideHome,
  LucideLayoutGrid,
  LucideListChecks,
  LucidePackage,
  LucideSearch,
  LucideSquarePlus,
  LucideTruck,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

export const UserPageIcons = {
  home: LucideHome,
  find: LucideSearch,
  marketplace: LucideLayoutGrid,
  ourListings: LucideListChecks,
  offer: LucideSquarePlus,
  transport: LucideTruck,
  freight: LucidePackage,
  warehouse: LucideWarehouse,
} as const satisfies Record<string, LucideIcon>;
