import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ADMIN_PORTAL_CONFIG } from '../../../portal/admin/admin-portal.config';
import { LANDING_URL, SIGN_IN_URL } from '../../guest.constants';
import { BrandMarkComponent } from '../../../shared/ui/brand-mark/brand-mark.component';
import { LanguagePickerComponent } from '../../../shared/ui/language-picker/language-picker.component';
import { ThemePickerComponent } from '../../../shared/ui/theme-picker/theme-picker.component';

@Component({
  selector: 'app-guest-topbar',
  imports: [
    RouterLink,
    TranslatePipe,
    BrandMarkComponent,
    ThemePickerComponent,
    LanguagePickerComponent,
  ],
  templateUrl: './guest-topbar.component.html',
  styleUrl: './guest-topbar.component.scss',
})
export class GuestTopbarComponent {
  readonly showNavActions = input(false);

  protected readonly landingUrl = LANDING_URL;
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly registerUrl = ADMIN_PORTAL_CONFIG.registerUrl ?? '/admin/register';
}
