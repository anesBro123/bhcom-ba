import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucidePackage,
  LucideSettings,
  LucideTruck,
} from '@lucide/angular';
import { ADMIN_PORTAL_CONFIG } from '../../../portal/admin/admin-portal.config';
import { EMPLOYEE_PORTAL_CONFIG } from '../../../portal/employee/employee-portal.config';
import { SIGN_IN_URL } from '../../guest.constants';
import { PortalCardComponent } from '../../shell/portal-card/portal-card.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, TranslatePipe, LucideTruck, LucidePackage, LucideSettings, PortalCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly registerUrl = ADMIN_PORTAL_CONFIG.registerUrl ?? '/admin/register';
  protected readonly employeeLoginUrl = EMPLOYEE_PORTAL_CONFIG.loginUrl;
  protected readonly adminLoginUrl = ADMIN_PORTAL_CONFIG.loginUrl;

  protected readonly features = [
    {
      icon: 'truck',
      accent: 'employee',
      titleKey: 'landing.features.fleet.title',
      descriptionKey: 'landing.features.fleet.description',
    },
    {
      icon: 'package',
      accent: 'neutral',
      titleKey: 'landing.features.shipments.title',
      descriptionKey: 'landing.features.shipments.description',
    },
    {
      icon: 'settings',
      accent: 'admin',
      titleKey: 'landing.features.admin.title',
      descriptionKey: 'landing.features.admin.description',
    },
  ] as const;
}
