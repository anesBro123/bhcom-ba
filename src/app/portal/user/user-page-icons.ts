import {
  LucideClipboardList,
  LucideHome,
  LucideMap,
  LucidePackage,
  LucideSearch,
  LucideSquarePlus,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

export const UserPageIcons = {
  home: LucideHome,
  find: LucideSearch,
  ourListings: LucideClipboardList,
  offer: LucideSquarePlus,
  transport: LucideMap,
  freight: LucidePackage,
  warehouse: LucideWarehouse,
} as const satisfies Record<string, LucideIcon>;
