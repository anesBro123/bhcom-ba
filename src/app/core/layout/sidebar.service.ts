import { Injectable, signal } from '@angular/core';

export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'bhcom-ba-sidebar-collapsed';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly _collapsed = signal(this.loadStoredCollapsed());

  readonly collapsed = this._collapsed.asReadonly();

  constructor() {
    this.applyCollapsed(this._collapsed());
  }

  toggle(): void {
    this.setCollapsed(!this._collapsed());
  }

  setCollapsed(collapsed: boolean): void {
    this._collapsed.set(collapsed);
    this.applyCollapsed(collapsed);
  }

  private applyCollapsed(collapsed: boolean): void {
    if (collapsed) {
      document.documentElement.dataset['sidebarCollapsed'] = '';
    } else {
      delete document.documentElement.dataset['sidebarCollapsed'];
    }
    localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, collapsed ? '1' : '0');
  }

  private loadStoredCollapsed(): boolean {
    return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === '1';
  }
}
