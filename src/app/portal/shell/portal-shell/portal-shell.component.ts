import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PORTAL_CONFIG } from '../../common/models/portal-config.model';
import { PortalSidebarComponent } from '../portal-sidebar/portal-sidebar.component';
import { PortalTopbarComponent } from '../portal-topbar/portal-topbar.component';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'portal-shell',
  imports: [PortalSidebarComponent, PortalTopbarComponent, RouterOutlet, TranslatePipe],
  templateUrl: './portal-shell.component.html',
  styleUrl: './portal-shell.component.scss',
})
export class PortalShellComponent {
  private readonly portal = inject(PORTAL_CONFIG);
  protected readonly sidebarService = inject(SidebarService);

  @HostBinding('class')
  protected get portalHostClass(): string {
    return this.portal.portal === 'admin' ? 'portal-admin' : 'portal-employee';
  }
}
