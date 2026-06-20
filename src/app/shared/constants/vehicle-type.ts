import type { LucideIcon } from '@lucide/angular';
import {
  LucideBike,
  LucideBus,
  LucideCar,
  LucideCaravan,
  LucideTractor,
  LucideTruck,
} from '@lucide/angular';

export type VehicleType = 'putnicko' | 'teretno' | 'motocikl' | 'autobus' | 'prikljucno' | 'radno';

export const VEHICLE_TYPE_OPTIONS: { value: VehicleType; labelKey: string }[] = [
  { value: 'putnicko', labelKey: 'shared.vehicleType.putnicko' },
  { value: 'teretno', labelKey: 'shared.vehicleType.teretno' },
  { value: 'motocikl', labelKey: 'shared.vehicleType.motocikl' },
  { value: 'autobus', labelKey: 'shared.vehicleType.autobus' },
  { value: 'prikljucno', labelKey: 'shared.vehicleType.prikljucno' },
  { value: 'radno', labelKey: 'shared.vehicleType.radno' },
];

export const VEHICLE_TYPE_ICONS: Record<VehicleType, LucideIcon> = {
  putnicko: LucideCar,
  teretno: LucideTruck,
  motocikl: LucideBike,
  autobus: LucideBus,
  prikljucno: LucideCaravan,
  radno: LucideTractor,
};

export function isVehicleType(value: string): value is VehicleType {
  return value in VEHICLE_TYPE_ICONS;
}

export function vehicleTypeLabelKey(type: VehicleType): string {
  return `shared.vehicleType.${type}`;
}
