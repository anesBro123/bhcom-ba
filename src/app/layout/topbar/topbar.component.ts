import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideBell,
  LucideCircleUser,
  LucideGlobe,
  LucideMenu,
  LucideMoon,
  LucideSun,
} from '@lucide/angular';
import { AppLanguage, LanguageService } from '../../core/i18n/language.service';
import { SidebarService } from '../../core/layout/sidebar.service';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [
    TranslatePipe,
    LucideMoon,
    LucideSun,
    LucideBell,
    LucideGlobe,
    LucideCircleUser,
    LucideMenu,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly elementRef = inject(ElementRef);
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);
  protected readonly sidebarService = inject(SidebarService);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');
  protected readonly langMenuOpen = signal(false);

  protected readonly languages: { code: AppLanguage; labelKey: string }[] = [
    { code: 'en', labelKey: 'topbar.lang.en' },
    { code: 'bh', labelKey: 'topbar.lang.bh' },
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.langMenuOpen.set(false);
    }
  }

  protected toggleLangMenu(): void {
    this.langMenuOpen.update((open) => !open);
  }

  protected selectLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
    this.langMenuOpen.set(false);
  }
}
