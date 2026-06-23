import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-language-picker',
  imports: [TranslatePipe],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss',
})
export class LanguagePickerComponent {
  protected readonly languageService = inject(LanguageService);

  protected readonly isEnglish = computed(() => this.languageService.lang() === 'en');

  protected toggleLanguage(): void {
    this.languageService.toggle();
  }
}
