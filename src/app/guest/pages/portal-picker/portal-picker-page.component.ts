import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ADMIN_LOGIN_URL, USER_LOGIN_URL } from '../../../shared/constants/app-urls';
import { PortalCardComponent } from './portal-card.component';

@Component({
  selector: 'app-portal-picker-page',
  imports: [TranslatePipe, PortalCardComponent],
  templateUrl: './portal-picker-page.component.html',
  styleUrl: './portal-picker-page.component.scss',
})
export class PortalPickerPageComponent {
  protected readonly userLoginUrl = USER_LOGIN_URL;
  protected readonly adminLoginUrl = ADMIN_LOGIN_URL;
}
