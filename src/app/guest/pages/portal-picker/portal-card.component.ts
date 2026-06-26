import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideArrowRight } from '@lucide/angular';
import type { PortalKind } from '../../../shared/constants/portal-kind.type';

@Component({
  selector: 'app-portal-card',
  imports: [RouterLink, TranslatePipe, LucideArrowRight],
  templateUrl: './portal-card.component.html',
  styleUrl: './portal-card.component.scss',
  host: {
    '[class]': 'hostClass',
  },
})
export class PortalCardComponent {
  readonly portalKind = input.required<PortalKind>();
  readonly badgeKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly route = input.required<string>();

  protected get hostClass(): string {
    return `portal-card portal-card--${this.portalKind()}`;
  }
}
