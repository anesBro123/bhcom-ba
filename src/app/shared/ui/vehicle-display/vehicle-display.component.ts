import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-vehicle-display',
  imports: [TranslatePipe],
  templateUrl: './vehicle-display.component.html',
  styleUrl: './vehicle-display.component.scss',
})
export class VehicleDisplayComponent {
  readonly name = input.required<string>();
  readonly plate = input.required<string>();
}
