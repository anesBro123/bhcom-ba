import { Component } from '@angular/core';

@Component({
  selector: 'app-form-grid',
  template: `<ng-content />`,
  styleUrl: './form-grid.component.scss',
  host: {
    class: 'form-grid',
  },
})
export class FormGridComponent {}

export function gridColumnSpan(colSpan: 1 | 2 | 3 | 'full' = 2): string {
  switch (colSpan) {
    case 'full':
      return 'span 12';
    case 2:
      return 'span 6';
    case 1:
    case 3:
    default:
      return 'span 4';
  }
}
