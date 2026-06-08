import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucidePackage,
  LucideSettings,
  LucideTruck,
} from '@lucide/angular';
import {
  ADMIN_LOGIN_URL,
  COMPANY_REGISTER_URL,
  EMPLOYEE_LOGIN_URL,
  SIGN_IN_URL,
} from '../../../shared/constants/app-urls';
import { PortalCardComponent } from '../../shell/portal-card/portal-card.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, TranslatePipe, LucideTruck, LucidePackage, LucideSettings, PortalCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly registerUrl = COMPANY_REGISTER_URL;
  protected readonly employeeLoginUrl = EMPLOYEE_LOGIN_URL;
  protected readonly adminLoginUrl = ADMIN_LOGIN_URL;

  protected readonly features = [
    {
      icon: 'truck',
      accent: 'employee',
      titleKey: 'guest.landing.features.fleet.title',
      descriptionKey: 'guest.landing.features.fleet.description',
    },
    {
      icon: 'package',
      accent: 'neutral',
      titleKey: 'guest.landing.features.shipments.title',
      descriptionKey: 'guest.landing.features.shipments.description',
    },
    {
      icon: 'settings',
      accent: 'admin',
      titleKey: 'guest.landing.features.admin.title',
      descriptionKey: 'guest.landing.features.admin.description',
    },
  ] as const;
}
