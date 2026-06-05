import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-placeholder',
  imports: [TranslatePipe],
  templateUrl: './page-placeholder.component.html',
  styleUrl: './page-placeholder.component.scss',
})
export class PagePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly titleKey = this.route.snapshot.data['titleKey'] as string;
}
