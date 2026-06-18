import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { filter } from 'rxjs';

import type { NavSection } from '../../../common/models/nav.model';
import { isNavSectionActive } from '../../../common/utils/is-nav-section-active';

const CLOSE_DELAY_MS = 200;

@Component({
  selector: 'portal-sidebar-section-flyout',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LucideDynamicIcon],
  templateUrl: './sidebar-section-flyout.component.html',
  styleUrl: './sidebar-section-flyout.component.scss',
})
export class SidebarSectionFlyoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  readonly section = input.required<NavSection>();

  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly open = signal(false);
  protected readonly panelTop = signal(0);
  protected readonly panelLeft = signal(0);
  protected readonly currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.currentUrl.set(this.router.url);
        this.close();
      });

    afterNextRender(() => {
      const nav = this.hostRef.nativeElement.closest('.sidebar__nav');
      if (!nav) {
        return;
      }

      const onScroll = (): void => {
        if (this.open()) {
          this.updatePanelPosition();
        }
      };

      nav.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        nav.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }

    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  protected sectionActive(): boolean {
    return isNavSectionActive(this.section(), this.currentUrl());
  }

  protected onZoneEnter(): void {
    this.clearCloseTimer();
    this.openFlyout();
  }

  protected onZoneLeave(): void {
    this.scheduleClose();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.open()) {
        this.close();
      } else {
        this.openFlyout();
      }
    }
  }

  protected onLinkClick(): void {
    this.close();
  }

  private openFlyout(): void {
    this.open.set(true);
    queueMicrotask(() => this.updatePanelPosition());
  }

  private close(): void {
    this.clearCloseTimer();
    this.open.set(false);
  }

  private scheduleClose(): void {
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => this.close(), CLOSE_DELAY_MS);
  }

  private clearCloseTimer(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  private updatePanelPosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    this.panelTop.set(rect.top);
    this.panelLeft.set(rect.right + 8);
  }
}
