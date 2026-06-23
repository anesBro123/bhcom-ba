import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideBell,
  LucideCircleUser,
  LucideLogOut,
  LucideMenu,
  LucideSettings,
  LucideUser,
} from '@lucide/angular';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { ThemePickerComponent } from '../../../shared/ui/theme-picker/theme-picker.component';
import { LanguagePickerComponent } from '../../../shared/ui/language-picker/language-picker.component';
import { LANDING_URL } from '../../../shared/constants/app-urls';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'portal-topbar',
  imports: [
    TranslatePipe,
    LucideBell,
    LucideCircleUser,
    LucideMenu,
    LucideUser,
    LucideSettings,
    LucideLogOut,
    LanguagePickerComponent,
    ThemePickerComponent,
  ],
  templateUrl: './portal-topbar.component.html',
  styleUrl: './portal-topbar.component.scss',
})
export class PortalTopbarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly sidebarService = inject(SidebarService);

  protected readonly accountMenuOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.accountMenuOpen.set(false);
    }
  }

  protected toggleAccountMenu(): void {
    this.accountMenuOpen.update((open) => !open);
  }

  protected onProfileClick(): void {
    this.accountMenuOpen.set(false);
  }

  protected onSettingsClick(): void {
    this.accountMenuOpen.set(false);
  }

  protected logout(): void {
    this.accountMenuOpen.set(false);
    this.auth.logout();
    void this.router.navigateByUrl(LANDING_URL);
  }
}
