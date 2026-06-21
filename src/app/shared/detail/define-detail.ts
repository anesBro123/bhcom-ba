import type { DetailDefinition } from './detail.types';

export function defineDetail<T extends object>() {
  return <const D extends DetailDefinition<T>>(definition: D): D => definition;
}
