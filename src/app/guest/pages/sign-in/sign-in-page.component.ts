import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ADMIN_LOGIN_URL,
  EMPLOYEE_LOGIN_URL,
  LANDING_URL,
} from '../../../shared/constants/app-urls';
import { PortalCardComponent } from '../../shell/portal-card/portal-card.component';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink, TranslatePipe, PortalCardComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  protected readonly landingUrl = LANDING_URL;
  protected readonly employeeLoginUrl = EMPLOYEE_LOGIN_URL;
  protected readonly adminLoginUrl = ADMIN_LOGIN_URL;
}
