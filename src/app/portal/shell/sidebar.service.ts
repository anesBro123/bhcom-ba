import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'bhcom-ba-sidebar-collapsed';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _collapsed = signal(this.loadStoredCollapsed());
  private readonly _mobileOpen = signal(false);

  readonly collapsed = this._collapsed.asReadonly();
  readonly mobileOpen = this._mobileOpen.asReadonly();

  constructor() {
    this.applyCollapsed(this._collapsed());
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeMobile());
  }

  toggle(): void {
    this.setCollapsed(!this._collapsed());
  }

  setCollapsed(collapsed: boolean): void {
    this._collapsed.set(collapsed);
    this.applyCollapsed(collapsed);
  }

  openMobile(): void {
    this._mobileOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeMobile(): void {
    if (!this._mobileOpen()) {
      return;
    }
    this._mobileOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleMobile(): void {
    if (this._mobileOpen()) {
      this.closeMobile();
    } else {
      this.openMobile();
    }
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
