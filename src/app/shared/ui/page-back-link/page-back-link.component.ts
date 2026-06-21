import { Component, inject, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronLeft } from '@lucide/angular';
import { filter, take } from 'rxjs';

import { ConfirmService } from '../../confirm';

@Component({
  selector: 'app-page-back-link',
  imports: [TranslatePipe, LucideChevronLeft],
  templateUrl: './page-back-link.component.html',
  styleUrl: './page-back-link.component.scss',
})
export class PageBackLinkComponent {
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmService);

  readonly route = input.required<string>();
  readonly labelKey = input.required<string>();
  readonly form = input<FormGroup | null>(null);

  protected onActivate(): void {
    const form = this.form();
    if (!form || !form.dirty) {
      void this.router.navigateByUrl(this.route());
      return;
    }

    this.confirmService
      .confirm({
        titleKey: 'shared.form.common.discardChanges.title',
        messageKey: 'shared.form.common.discardChanges.message',
        confirmLabelKey: 'shared.form.common.discardChanges.confirm',
        danger: true,
      })
      .pipe(filter(Boolean), take(1))
      .subscribe(() => {
        void this.router.navigateByUrl(this.route());
      });
  }
}
