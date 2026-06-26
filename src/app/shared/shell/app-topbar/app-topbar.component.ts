import { Component, computed, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideBell,
  LucideCircleUser,
  LucideListChecks,
  LucideLogOut,
  LucideSettings,
} from '@lucide/angular';
import { filter, map } from 'rxjs';
import {
  ADMIN_SETTINGS_URL,
  COMPANY_REGISTER_URL,
  SIGN_IN_URL,
  userOurListingsUrl,
} from '../../constants/app-urls';
import { AuthService } from '../../core/auth/auth.service';
import { BrandMarkComponent } from '../../ui/brand-mark/brand-mark.component';
import { LanguagePickerComponent } from '../../ui/language-picker/language-picker.component';
import { ThemePickerComponent } from '../../ui/theme-picker/theme-picker.component';
import { ADMIN_PORTAL_CONFIG } from '../../../portal/admin/admin-portal.config';
import { USER_PORTAL_CONFIG } from '../../../portal/user/user-portal.config';
import { OfferMenuComponent } from './offer-menu/offer-menu.component';

type TopbarMode = 'guest' | 'user' | 'admin';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterLink,
    TranslatePipe,
    BrandMarkComponent,
    ThemePickerComponent,
    LanguagePickerComponent,
    OfferMenuComponent,
    LucideBell,
    LucideCircleUser,
    LucideListChecks,
    LucideSettings,
    LucideLogOut,
  ],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss',
})
export class AppTopbarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly portalConfig = computed(() => {
    const kind = this.auth.portalKind();
    if (kind === 'admin') {
      return ADMIN_PORTAL_CONFIG;
    }
    if (kind === 'user') {
      return USER_PORTAL_CONFIG;
    }
    return null;
  });

  private readonly offerMenu = viewChild(OfferMenuComponent);

  protected readonly accountMenuOpen = signal(false);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly mode = computed<TopbarMode>(() => {
    if (!this.auth.isAuthenticated()) {
      return 'guest';
    }
    return this.auth.portalKind() === 'admin' ? 'admin' : 'user';
  });

  protected readonly showGuestSignInLink = computed(
    () => this.mode() === 'guest' && this.currentUrl() !== '/',
  );

  protected readonly brandLinkUrl = computed(() => {
    if (this.mode() === 'guest') {
      return SIGN_IN_URL;
    }
    return this.portalConfig()?.shell.homeUrl ?? SIGN_IN_URL;
  });

  protected readonly brandSuffixKey = computed(
    () => this.portalConfig()?.shell.brandSuffixKey,
  );

  protected readonly topbarNav = computed(() => this.portalConfig()?.topbarNav ?? []);

  protected readonly showAdminSettings = computed(() => this.mode() === 'admin');

  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly registerUrl = COMPANY_REGISTER_URL;
  protected readonly settingsUrl = ADMIN_SETTINGS_URL;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.accountMenuOpen.set(false);
      this.offerMenu()?.close();
    }
  }

  protected onOfferMenuOpenChange(open: boolean): void {
    if (open) {
      this.accountMenuOpen.set(false);
    }
  }

  protected toggleAccountMenu(): void {
    this.offerMenu()?.close();
    this.accountMenuOpen.update((open) => !open);
  }

  protected onProfileClick(): void {
    this.accountMenuOpen.set(false);
    if (this.mode() === 'user') {
      void this.router.navigateByUrl(userOurListingsUrl('transport'));
    }
  }

  protected onSettingsClick(): void {
    this.accountMenuOpen.set(false);
    if (this.mode() === 'admin') {
      void this.router.navigateByUrl(ADMIN_SETTINGS_URL);
    }
  }

  protected logout(): void {
    this.accountMenuOpen.set(false);
    this.auth.logout();
    void this.router.navigateByUrl(SIGN_IN_URL);
  }
}
