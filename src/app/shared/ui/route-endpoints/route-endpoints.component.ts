import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-route-endpoints',
  imports: [TranslatePipe],
  templateUrl: './route-endpoints.component.html',
  styleUrl: './route-endpoints.component.scss',
})
export class RouteEndpointsComponent {
  readonly origin = input.required<string>();
  readonly destination = input.required<string>();
}
