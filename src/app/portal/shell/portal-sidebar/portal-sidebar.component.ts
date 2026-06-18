import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideDynamicIcon,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideX,
} from '@lucide/angular';
import { filter } from 'rxjs';
import { BrandMarkComponent } from '../../../shared/ui/brand-mark/brand-mark.component';
import { PORTAL_CONFIG } from '../../common/models/portal-config.model';
import type { NavSection } from '../../common/models/nav.model';
import { isNavSectionActive } from '../../common/utils/is-nav-section-active';
import { MOBILE_MEDIA_QUERY } from '../viewport';
import { SidebarService } from '../sidebar.service';
import { SidebarSectionFlyoutComponent } from './sidebar-section-flyout/sidebar-section-flyout.component';

@Component({
  selector: 'portal-sidebar',
  host: {
    '[class.sidebar--mobile-open]': 'sidebarService.mobileOpen()',
  },
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideDynamicIcon,
    BrandMarkComponent,
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideX,
    SidebarSectionFlyoutComponent,
  ],
  templateUrl: './portal-sidebar.component.html',
  styleUrl: './portal-sidebar.component.scss',
})
export class PortalSidebarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  protected readonly sidebarService = inject(SidebarService);
  protected readonly portal = inject(PORTAL_CONFIG);
  protected readonly navSections = this.portal.nav;

  protected readonly isMobileLayout = signal(false);
  protected readonly currentUrl = signal(this.router.url);
  protected readonly flyoutMode = computed(
    () => this.sidebarService.collapsed() && !this.isMobileLayout(),
  );

  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.currentUrl.set(this.router.url));

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
      const updateLayout = (): void => {
        this.isMobileLayout.set(this.mediaQuery?.matches ?? false);
      };

      updateLayout();
      this.mediaQuery.addEventListener('change', updateLayout);

      this.destroyRef.onDestroy(() => {
        this.mediaQuery?.removeEventListener('change', updateLayout);
      });
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.sidebarService.mobileOpen()) {
      this.sidebarService.closeMobile();
    }
  }

  protected get toggleLabelKey(): string {
    return this.sidebarService.collapsed() ? 'shared.sidebar.expand' : 'shared.sidebar.collapse';
  }

  protected usesFlyout(section: NavSection): boolean {
    return this.flyoutMode() && section.items.length > 1;
  }

  protected isRailLink(section: NavSection): boolean {
    return this.flyoutMode() && section.items.length === 1;
  }

  protected isSectionActive(section: NavSection): boolean {
    return isNavSectionActive(section, this.currentUrl());
  }
}
