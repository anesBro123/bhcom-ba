import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ADMIN_PORTAL_CONFIG } from '../../../portal/admin/admin-portal.config';
import { EMPLOYEE_PORTAL_CONFIG } from '../../../portal/employee/employee-portal.config';
import { LANDING_URL } from '../../guest.constants';
import { PortalCardComponent } from '../../shell/portal-card/portal-card.component';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink, TranslatePipe, PortalCardComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  protected readonly landingUrl = LANDING_URL;
  protected readonly employeeLoginUrl = EMPLOYEE_PORTAL_CONFIG.loginUrl;
  protected readonly adminLoginUrl = ADMIN_PORTAL_CONFIG.loginUrl;
}
