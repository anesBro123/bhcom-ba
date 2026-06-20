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
    return true;
  }

  const raw = localStorage.getItem(key);
  if (raw === null) {
    return true;
  }

  return raw === 'true';
}

export function saveFilterPanelExpanded(key: string, expanded: boolean): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(key, String(expanded));
}
