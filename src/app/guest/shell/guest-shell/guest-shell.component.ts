import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, merge, of } from 'rxjs';
import { GuestFooterComponent } from '../guest-footer/guest-footer.component';
import { GuestTopbarComponent } from '../guest-topbar/guest-topbar.component';

@Component({
  selector: 'app-guest-shell',
  imports: [GuestTopbarComponent, GuestFooterComponent, RouterOutlet],
  templateUrl: './guest-shell.component.html',
  styleUrl: './guest-shell.component.scss',
})
export class GuestShellComponent {
  private readonly router = inject(Router);

  private readonly routeData = toSignal(
    merge(
      of(null),
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ).pipe(map(() => this.getDeepestRouteData())),
    { initialValue: {} as Record<string, unknown> },
  );

  protected readonly showFooter = computed(() => this.routeData()['showFooter'] === true);
  protected readonly showNavActions = computed(
    () => this.routeData()['showNavActions'] === true,
  );

  private getDeepestRouteData(): Record<string, unknown> {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot?.data ?? {};
  }
}
