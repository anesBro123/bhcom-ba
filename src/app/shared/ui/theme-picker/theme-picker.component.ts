import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideMoon, LucideSun } from '@lucide/angular';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-theme-picker',
  imports: [TranslatePipe, LucideMoon, LucideSun],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
