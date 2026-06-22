import {
  LucideClipboardList,
  LucideHome,
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
  ourListings: LucideClipboardList,
  offer: LucideSquarePlus,
  transport: LucideTruck,
  freight: LucidePackage,
  warehouse: LucideWarehouse,
} as const satisfies Record<string, LucideIcon>;
