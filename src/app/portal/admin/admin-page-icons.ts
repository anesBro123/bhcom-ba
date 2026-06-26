import {
  LucideHome,
  LucideLayoutGrid,
  LucideSettings,
  LucideTruck,
  LucideUsers,
  LucideWarehouse,
} from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

export const AdminPageIcons = {
  home: LucideHome,
  dashboard: LucideLayoutGrid,
  users: LucideUsers,
  vehicles: LucideTruck,
  warehouses: LucideWarehouse,
  settings: LucideSettings,
} as const satisfies Record<string, LucideIcon>;
