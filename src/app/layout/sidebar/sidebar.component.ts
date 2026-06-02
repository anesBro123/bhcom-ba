import { Component, HostBinding, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideDynamicIcon,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideTruck,
  LucideX,
} from '@lucide/angular';
import { PORTAL_CONFIG } from '../../core/portal';
import { SidebarService } from '../../core/layout/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideDynamicIcon,
    LucideTruck,
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideX,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly portal = inject(PORTAL_CONFIG);
  protected readonly navSections = this.portal.nav;

  @HostBinding('class.sidebar--mobile-open')
  protected get mobileOpenClass(): boolean {
    return this.sidebarService.mobileOpen();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.sidebarService.mobileOpen()) {
      this.sidebarService.closeMobile();
    }
  }

  protected get toggleLabelKey(): string {
    return this.sidebarService.collapsed() ? 'sidebar.expand' : 'sidebar.collapse';
  }
}
