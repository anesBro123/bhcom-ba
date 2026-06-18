import { booleanAttribute, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-route-display',
  imports: [TranslatePipe],
  templateUrl: './route-display.component.html',
  styleUrl: './route-display.component.scss',
})
export class RouteDisplayComponent {
  readonly origin = input.required<string>();
  readonly destination = input.required<string>();
  readonly nowrap = input(false, { transform: booleanAttribute });
}
