import {
  LucideLayoutGrid,
  LucideMap,
  LucidePackage,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

export const UserPageIcons = {
  dashboard: LucideLayoutGrid,
  routes: LucideMap,
  cargo: LucidePackage,
  storage: LucideWarehouse,
} as const satisfies Record<string, LucideIcon>;
