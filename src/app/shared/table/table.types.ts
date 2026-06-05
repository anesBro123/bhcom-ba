import type { LucideIcon } from '@lucide/angular';

export type ColumnFormat = 'text' | 'date' | 'number' | 'currency';
export type ColumnCell = 'default' | 'custom';
export type SortDirection = 'asc' | 'desc';

export interface ColumnDef<T, K extends keyof T & string = keyof T & string> {
  key: K;
  titleKey: string;
  sortable?: boolean;
  hidden?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: ColumnFormat;
  cell?: ColumnCell;
  mobile?: {
    /** Shown in card header; defaults to first visible column if none marked */
    primary?: boolean;
    /** Omit from card body (e.g. when only used in header) */
    hidden?: boolean;
  };
}

export type FilterDef<T> =
  | {
      key: keyof T & string;
      type: 'search';
      titleKey: string;
      placeholderKey: string;
      debounceMs?: number;
      searchFields?: (keyof T & string)[];
    }
  | {
      key: keyof T & string;
      type: 'select';
      titleKey: string;
      placeholderKey: string;
      options: { value: string; labelKey: string }[];
    };

export interface RowActionDef<T> {
  id: string;
  labelKey: string;
  icon?: LucideIcon;
  danger?: boolean;
  visible?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
}

export interface RowActionsConfig<T> {
  width?: string;
  titleKey?: string;
  items: RowActionDef<T>[];
}

export interface RowActionEvent<T> {
  actionId: string;
  row: T;
}

export interface TableDefinition<T> {
  endpoint: string;
  titleKey: string;
  summaryKey: string;
  entityKey: string;
  defaultPageSize?: number;
  defaultSort?: { field: keyof T & string; direction: SortDirection };
  selectable?: boolean;
  trackBy?: keyof T & string;
  columns: ColumnDef<T>[];
  filters?: FilterDef<T>[];
  actions?: RowActionsConfig<T>;
}

export interface TableQuery {
  page: number;
  pageSize: number;
  sortField: string | null;
  sortDirection: SortDirection | null;
  filters: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TableCellContext<T> {
  $implicit: T;
  value: unknown;
  columnKey: string;
}

export type TableLoader<T> = (query: TableQuery) => import('rxjs').Observable<PaginatedResponse<T>>;
