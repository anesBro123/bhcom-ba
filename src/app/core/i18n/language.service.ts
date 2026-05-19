import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'bh';

export const LANGUAGE_STORAGE_KEY = 'bhcom-ba-language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly _lang = signal<AppLanguage>(this.loadStoredLanguage());

  readonly lang = this._lang.asReadonly();

  constructor() {
    this.translate.addLangs(['en', 'bh']);
    this.translate.setFallbackLang('en');
    this.applyLanguage(this._lang());
  }

  setLanguage(lang: AppLanguage): void {
    this._lang.set(lang);
    this.applyLanguage(lang);
  }

  private applyLanguage(lang: AppLanguage): void {
    this.translate.use(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'bh' ? 'bs' : 'en';
  }

  private loadStoredLanguage(): AppLanguage {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'en' || stored === 'bh' ? stored : 'en';
  }
}
