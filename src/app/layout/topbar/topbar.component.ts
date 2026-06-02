import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
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
import { AuthService } from '../../core/auth/auth.service';
import { SidebarService } from '../../core/layout/sidebar.service';
import { PORTAL_CONFIG } from '../../core/portal';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'app-topbar',
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
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly languagePicker = viewChild(LanguagePickerComponent);
  protected readonly portal = inject(PORTAL_CONFIG);
  protected readonly sidebarService = inject(SidebarService);

  protected readonly accountMenuOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.accountMenuOpen.set(false);
    }
  }

  protected onLanguagePickerOpened(): void {
    this.accountMenuOpen.set(false);
  }

  protected toggleAccountMenu(): void {
    this.accountMenuOpen.update((open) => !open);
    this.languagePicker()?.close();
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
    void this.router.navigateByUrl(this.portal.loginUrl);
  }
}
