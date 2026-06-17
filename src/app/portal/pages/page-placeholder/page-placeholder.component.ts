import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component';

@Component({
  selector: 'app-page-placeholder',
  imports: [PageTitleComponent],
  templateUrl: './page-placeholder.component.html',
  styleUrl: './page-placeholder.component.scss',
})
export class PagePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly titleKey = this.route.snapshot.data['titleKey'] as string;
  protected readonly subtitleKey = this.route.snapshot.data['subtitleKey'] as string;
}
