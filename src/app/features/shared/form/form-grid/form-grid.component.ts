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

export function gridColumnSpan(colSpan: 1 | 2 | 3 | 4 | 5 | 'full' = 2): string {
  switch (colSpan) {
    case 'full':
      return 'span 12';
    case 2:
      return 'span 6';
    case 3:
      return 'span 8';
    case 4:
      return 'span 2';
    case 5:
      return 'span 5';
    case 1:
    default:
      return 'span 4';
  }
}
