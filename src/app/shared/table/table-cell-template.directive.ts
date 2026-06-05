import { Directive, inject, input, TemplateRef } from '@angular/core';

import type { TableCellContext } from './table.types';

@Directive({
  selector: '[appTableCell]',
})
export class TableCellTemplateDirective {
  readonly columnKey = input.required<string>({ alias: 'appTableCell' });
  readonly template = inject(TemplateRef<TableCellContext<unknown>>);
}
