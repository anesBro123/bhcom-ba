import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-placeholder',
  imports: [TranslatePipe],
  template: `<h1 class="page-title">{{ titleKey | translate }}</h1>`,
  styles: `
    .page-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  `,
})
export class PagePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly titleKey = this.route.snapshot.data['titleKey'] as string;
}
