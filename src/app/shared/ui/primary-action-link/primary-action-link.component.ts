import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideSquarePlus, type LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-primary-action-link',
  imports: [RouterLink, TranslatePipe, NgComponentOutlet],
  templateUrl: './primary-action-link.component.html',
  styleUrl: './primary-action-link.component.scss',
})
export class PrimaryActionLinkComponent {
  readonly route = input.required<string>();
  readonly labelKey = input.required<string>();
  readonly icon = input<LucideIcon>(LucideSquarePlus);

  protected readonly iconInputs = { size: 16 };
}
