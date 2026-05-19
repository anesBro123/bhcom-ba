import { Component, computed, inject } from '@angular/core';
import { LucideBell, LucideCircleUser, LucideGlobe, LucideMoon, LucideSun } from '@lucide/angular';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [LucideMoon, LucideSun, LucideBell, LucideGlobe, LucideCircleUser],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected readonly themeAriaLabel = computed(() =>
    this.isDark() ? 'Switch to light mode' : 'Switch to dark mode',
  );
}
