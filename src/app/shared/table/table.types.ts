import type { LucideIcon } from '@lucide/angular';

export type ColumnFormat = 'text' | 'date' | 'number' | 'currency';
export type ColumnCell = 'default' | 'custom';
export type SortDirection = 'asc' | 'desc';

export interface DateRangeFilterValue {
  from?: string;
  to?: string;
}

export interface NumberRangeFilterValue {
  min?: number;
  max?: number;
}

export interface FilterOption {
  value: string;
  labelKey?: string;
  label?: string;
}

export interface FilterGroupMeta {
  groupTitleKey?: string;
}

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
    /** Shown in card header beside primary (e.g. status badge) */
    header?: boolean;
    /** Omit from card body (e.g. when only used in header) */
    hidden?: boolean;
  };
}

export type FilterDef<T> =
  | ({
      key: string;
      type: 'search';
      titleKey: string;
      placeholderKey: string;
      debounceMs?: number;
      searchFields?: (keyof T & string)[];
    } & FilterGroupMeta)
  | ({
      key: string;
      type: 'select';
      titleKey: string;
      placeholderKey: string;
      options: FilterOption[];
      field?: keyof T & string;
    } & FilterGroupMeta)
  | ({
      key: string;
      type: 'multiSelect';
      titleKey: string;
      placeholderKey: string;
      options: FilterOption[];
      searchable?: boolean;
      showOptionIcons?: boolean;
      showStatusBadges?: boolean;
      field?: keyof T & string;
    } & FilterGroupMeta)
  | ({
      key: string;
      type: 'optionTiles';
      titleKey: string;
      options: FilterOption[];
      showOptionIcons?: boolean;
      showStatusBadges?: boolean;
      field?: keyof T & string;
    } & FilterGroupMeta)
  | ({
      key: string;
      type: 'dateRange';
      titleKey: string;
      field: keyof T & string;
      endField?: keyof T & string;
      singleDate?: boolean;
    } & FilterGroupMeta)
  | ({
      key: string;
      type: 'numberRange';
      titleKey: string;
      field?: keyof T & string;
      min: number;
      max: number;
      step?: number;
      unitSuffixKey?: string;
      chipTitleKey?: string;
    } & FilterGroupMeta);

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
  summaryKey: string;
  entityKey: string;
  defaultPageSize?: number;
  defaultSort?: { field: keyof T & string; direction: SortDirection };
  selectable?: boolean;
  trackBy?: keyof T & string;
  filterStorageKey?: string;
  showFilterChips?: boolean;
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

/** Table filter/header chrome layout — used for A/B comparison until a winner is chosen. */
export type TableChromeVariant = 'bandLadder' | 'splitCard' | 'bandLadderLabeled';

export type TableViewMode = 'list' | 'card';
