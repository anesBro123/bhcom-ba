import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-placeholder',
  template: `<h1 class="page-title">{{ title }}</h1>`,
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
  protected readonly title = this.route.snapshot.data['title'] as string;
}
