import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/core/i18n/language.service';
import { ThemeService } from './shared/core/theme/theme.service';
import { SidebarService } from './portal/shell/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly _theme = inject(ThemeService);
  private readonly _language = inject(LanguageService);
  private readonly _sidebar = inject(SidebarService);
}
