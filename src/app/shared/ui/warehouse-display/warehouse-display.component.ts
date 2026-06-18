import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-display',
  imports: [TranslatePipe],
  templateUrl: './warehouse-display.component.html',
  styleUrl: './warehouse-display.component.scss',
})
export class WarehouseDisplayComponent {
  readonly name = input.required<string>();
  readonly city = input.required<string>();
}
