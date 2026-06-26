import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AppTopbarComponent } from '../app-topbar/app-topbar.component';

@Component({
  selector: 'app-shell',
  imports: [AppTopbarComponent, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly auth = inject(AuthService);

  @HostBinding('class')
  protected get portalHostClass(): string {
    const kind = this.auth.portalKind();
    if (kind === 'admin') {
      return 'portal-admin';
    }
    if (kind === 'user') {
      return 'portal-user';
    }
    return '';
  }
}
