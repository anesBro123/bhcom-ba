import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SidebarService } from '../core/layout/sidebar.service';
import { PORTAL_CONFIG } from '../core/portal';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, TranslatePipe],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly portal = inject(PORTAL_CONFIG);
  protected readonly sidebarService = inject(SidebarService);

  @HostBinding('class')
  protected get portalHostClass(): string {
    return this.portal.portal === 'admin' ? 'portal-admin' : 'portal-employee';
  }
}
