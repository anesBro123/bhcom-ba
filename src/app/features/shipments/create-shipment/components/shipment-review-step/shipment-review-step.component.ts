import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCalculator, LucideInfo } from '@lucide/angular';

import { FormSectionComponent } from '../../../../../core/form';
import {
  calculateShipmentCost,
  formatAddressLine,
  packageTotals,
  priorityLabelKey,
  selectedServicesLabels,
  shipmentTypeLabelKey,
} from '../../create-shipment.utils';
import type { CreateShipmentFormModel } from '../../create-shipment.model';

@Component({
  selector: 'app-shipment-review-step',
  imports: [CurrencyPipe, TranslatePipe, FormSectionComponent, LucideCalculator, LucideInfo],
  templateUrl: './shipment-review-step.component.html',
  styleUrl: './shipment-review-step.component.scss',
})
export class ShipmentReviewStepComponent {
  readonly form = input.required<FormGroup>();
  readonly value = input.required<Partial<CreateShipmentFormModel>>();

  protected readonly LucideCalculator = LucideCalculator;
  protected readonly estimateVersion = signal(0);

  protected readonly totals = computed(() => packageTotals(this.value()));
  protected readonly cost = computed(() => {
    this.estimateVersion();
    return calculateShipmentCost(this.value());
  });

  protected readonly services = computed(() => selectedServicesLabels(this.value()));

  protected recalculate(): void {
    this.estimateVersion.update((v) => v + 1);
  }

  protected typeLabelKey(): string {
    return shipmentTypeLabelKey(this.value().shipmentType);
  }

  protected priorityLabel(): string {
    return priorityLabelKey(this.value().deliveryPriority);
  }

  protected originLine(): string {
    const v = this.value();
    return formatAddressLine(
      v.originCompany,
      v.originAddress1,
      v.originCity,
      v.originState,
      v.originZip,
    );
  }

  protected destinationLine(): string {
    const v = this.value();
    return formatAddressLine(
      v.destinationCompany,
      v.destinationAddress1,
      v.destinationCity,
      v.destinationState,
      v.destinationZip,
    );
  }
}
