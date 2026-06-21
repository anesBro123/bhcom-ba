import type { LucideIcon } from '@lucide/angular';

import type { SelectOption } from '../form/form.types';

export type DetailFieldType =
  | 'text'
  | 'date'
  | 'number'
  | 'status'
  | 'route'
  | 'vehicle'
  | 'warehouse'
  | 'translate';

export interface DetailFieldDefBase<T> {
  labelKey: string;
  hidden?: (data: T) => boolean;
}

export interface DetailKeyedFieldDef<T, K extends keyof T & string = keyof T & string>
  extends DetailFieldDefBase<T> {
  key: K;
  type: 'text' | 'date' | 'number' | 'status';
  suffixKey?: string;
  suffixKeyFn?: (data: T) => string | undefined;
}

export interface DetailRouteFieldDef<T> extends DetailFieldDefBase<T> {
  type: 'route';
  originKey: keyof T & string;
  destinationKey: keyof T & string;
}

export interface DetailVehicleFieldDef<T> extends DetailFieldDefBase<T> {
  type: 'vehicle';
  nameKey: keyof T & string;
  plateKey: keyof T & string;
}

export interface DetailWarehouseFieldDef<T> extends DetailFieldDefBase<T> {
  type: 'warehouse';
  nameKey: keyof T & string;
  cityKey: keyof T & string;
}

export interface DetailTranslateFieldDef<T> extends DetailFieldDefBase<T> {
  key: keyof T & string;
  type: 'translate';
  options: SelectOption[];
}

export type DetailFieldDef<T> =
  | DetailKeyedFieldDef<T>
  | DetailRouteFieldDef<T>
  | DetailVehicleFieldDef<T>
  | DetailWarehouseFieldDef<T>
  | DetailTranslateFieldDef<T>;

export interface DetailSectionDef<T> {
  id: string;
  titleKey: string;
  fields: readonly DetailFieldDef<T>[];
  colSpan?: 1 | 2 | 'full';
}

export interface DetailDefinition<T> {
  sections: readonly DetailSectionDef<T>[];
}

export interface DetailActionDef {
  id: string;
  labelKey: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  danger?: boolean;
  route?: string;
}
