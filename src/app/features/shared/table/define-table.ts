import type { TableDefinition } from './table.types';

export function defineTable<T>() {
  return <D extends TableDefinition<T>>(definition: D): D => definition;
}

export function tableCellKey<T, K extends keyof T & string>(
  _table: TableDefinition<T>,
  key: K,
): K {
  return key;
}
