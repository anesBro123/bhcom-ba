import { Component, ElementRef, HostListener, inject, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideGlobe } from '@lucide/angular';
import { AppLanguage, LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-language-picker',
  imports: [TranslatePipe, LucideGlobe],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss',
})
export class LanguagePickerComponent {
  private readonly elementRef = inject(ElementRef);
  protected readonly languageService = inject(LanguageService);

  /** Emitted when the menu opens (e.g. topbar closes account menu). */
  readonly opened = output<void>();

  protected readonly menuOpen = signal(false);

  protected readonly languages: { code: AppLanguage; labelKey: string }[] = [
    { code: 'en', labelKey: 'shared.topbar.lang.en' },
    { code: 'bh', labelKey: 'shared.topbar.lang.bh' },
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuOpen.set(false);
    }
  }

  close(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    if (next) {
      this.opened.emit();
    }
  }

  protected selectLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
    this.menuOpen.set(false);
  }
}
