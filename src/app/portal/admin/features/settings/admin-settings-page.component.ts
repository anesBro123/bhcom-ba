import { Component } from '@angular/core';

import { AdminPageIcons } from '../../admin-page-icons';
import { PageTitleComponent } from '../../../../shared/ui/page-title/page-title.component';

@Component({
  selector: 'app-admin-settings-page',
  imports: [PageTitleComponent],
  templateUrl: './admin-settings-page.component.html',
  styleUrl: './admin-settings-page.component.scss',
})
export class AdminSettingsPageComponent {
  protected readonly pageIcon = AdminPageIcons.settings;
}
