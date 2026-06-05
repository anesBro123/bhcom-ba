import { Component, HostBinding, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideDynamicIcon,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideX,
} from '@lucide/angular';
import { BrandMarkComponent } from '../../../shared/ui/brand-mark/brand-mark.component';
import { PORTAL_CONFIG } from '../../common/models/portal-config.model';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'portal-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideDynamicIcon,
    BrandMarkComponent,
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideX,
  ],
  templateUrl: './portal-sidebar.component.html',
  styleUrl: './portal-sidebar.component.scss',
})
export class PortalSidebarComponent {
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
