import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type FormControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { DELIVERY_PRIORITY_OPTIONS } from '../../create-shipment.constants';

@Component({
  selector: 'app-delivery-priority-cards',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './delivery-priority-cards.component.html',
  styleUrl: './delivery-priority-cards.component.scss',
})
export class DeliveryPriorityCardsComponent {
  readonly control = input.required<FormControl<string>>();

  protected readonly options = DELIVERY_PRIORITY_OPTIONS;
}
