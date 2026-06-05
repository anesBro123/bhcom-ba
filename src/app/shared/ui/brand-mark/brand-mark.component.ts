import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideTruck } from '@lucide/angular';

@Component({
  selector: 'app-brand-mark',
  imports: [RouterLink, TranslatePipe, LucideTruck],
  templateUrl: './brand-mark.component.html',
  styleUrl: './brand-mark.component.scss',
})
export class BrandMarkComponent {
  readonly portalSuffixKey = input<string>();
  readonly linkUrl = input<string>('/');
}
