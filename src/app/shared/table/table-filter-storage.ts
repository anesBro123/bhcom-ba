import type { TableViewMode } from './table.types';

export function loadStoredFilters(key: string): Record<string, unknown> {
  if (typeof localStorage === 'undefined') {
    return {};
  }

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function saveStoredFilters(key: string, filters: Record<string, unknown>): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(filters));
}

export function clearStoredFilters(key: string): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.removeItem(key);
}

export function filterPanelStorageKey(filterStorageKey: string): string {
  return `${filterStorageKey}.panelExpanded`;
}

export function loadFilterPanelExpanded(key: string): boolean {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  const raw = localStorage.getItem(key);
  if (raw === null) {
    return false;
  }

  return raw === 'true';
}

export function saveFilterPanelExpanded(key: string, expanded: boolean): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(key, String(expanded));
}

export function viewModeStorageKey(baseKey: string): string {
  return `${baseKey}.viewMode`;
}

export function loadViewMode(key: string): TableViewMode {
  if (typeof localStorage === 'undefined') {
    return 'list';
  }

  const raw = localStorage.getItem(viewModeStorageKey(key));
  if (raw === 'card' || raw === 'list') {
    return raw;
  }

  return 'list';
}

export function saveViewMode(key: string, mode: TableViewMode): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(viewModeStorageKey(key), mode);
}
