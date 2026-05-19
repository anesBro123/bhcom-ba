import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideDynamicIcon,
  LucidePanelLeft,
  LucidePanelLeftClose,
  LucideTruck,
} from '@lucide/angular';
import { SidebarService } from '../../core/layout/sidebar.service';
import { SIDEBAR_NAV } from './sidebar-nav.config';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideDynamicIcon,
    LucideTruck,
    LucidePanelLeft,
    LucidePanelLeftClose,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly navSections = SIDEBAR_NAV;
}
