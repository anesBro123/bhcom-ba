import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon, LucideTruck } from '@lucide/angular';
import { SIDEBAR_NAV } from './sidebar-nav.config';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon, LucideTruck],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly navSections = SIDEBAR_NAV;
}
