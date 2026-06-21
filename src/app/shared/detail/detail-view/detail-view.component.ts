import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { DetailFieldRendererComponent } from '../detail-field-renderer/detail-field-renderer.component';
import type { DetailDefinition } from '../detail.types';

@Component({
  selector: 'app-detail-view',
  imports: [TranslatePipe, DetailFieldRendererComponent],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss',
})
export class DetailViewComponent<T extends object> {
  readonly definition = input.required<DetailDefinition<T>>();
  readonly data = input.required<T>();

  protected isFieldVisible(field: DetailDefinition<T>['sections'][number]['fields'][number]): boolean {
    const hidden = field.hidden;
    return hidden ? !hidden(this.data()) : true;
  }

  protected sectionColSpan(
    section: DetailDefinition<T>['sections'][number],
  ): string {
    if (section.colSpan === 'full' || section.colSpan === 2) {
      return 'detail-view__section--full';
    }

    return '';
  }
}
