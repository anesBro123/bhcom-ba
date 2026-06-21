import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import type { DetailActionDef } from '../../detail/detail.types';

@Component({
  selector: 'app-detail-action-bar',
  imports: [TranslatePipe, RouterLink, NgComponentOutlet],
  templateUrl: './detail-action-bar.component.html',
  styleUrl: './detail-action-bar.component.scss',
})
export class DetailActionBarComponent {
  readonly actions = input.required<DetailActionDef[]>();
  readonly layout = input<'inline' | 'stack'>('inline');

  readonly action = output<string>();

  protected readonly iconInputs = { size: 16 };

  protected onAction(action: DetailActionDef): void {
    if (action.route) {
      return;
    }

    this.action.emit(action.id);
  }
}
