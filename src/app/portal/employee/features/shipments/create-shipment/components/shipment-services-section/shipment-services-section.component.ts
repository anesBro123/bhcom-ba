import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronDown, LucideInfo, LucideShield } from '@lucide/angular';

import { FormSectionComponent } from '../../../../../../../shared/form';
import { CARRIER_OPTIONS, SERVICE_LEVEL_OPTIONS } from '../../create-shipment.constants';

@Component({
  selector: 'app-shipment-services-section',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormSectionComponent,
    LucideChevronDown,
    LucideInfo,
  ],
  templateUrl: './shipment-services-section.component.html',
  styleUrl: './shipment-services-section.component.scss',
})
export class ShipmentServicesSectionComponent {
  readonly form = input.required<FormGroup>();

  protected readonly LucideShield = LucideShield;

  protected readonly carriers = CARRIER_OPTIONS;
  protected readonly serviceLevels = SERVICE_LEVEL_OPTIONS;

  protected readonly toggles = [
    {
      key: 'insuranceCoverage',
      labelKey: 'forms.createShipment.services.insuranceCoverage',
      descriptionKey: 'forms.createShipment.services.insuranceCoverageDesc',
    },
    {
      key: 'signatureRequired',
      labelKey: 'forms.createShipment.services.signatureRequired',
      descriptionKey: 'forms.createShipment.services.signatureRequiredDesc',
    },
    {
      key: 'fragileHandling',
      labelKey: 'forms.createShipment.services.fragileHandling',
      descriptionKey: 'forms.createShipment.services.fragileHandlingDesc',
    },
    {
      key: 'temperatureControl',
      labelKey: 'forms.createShipment.services.temperatureControl',
      descriptionKey: 'forms.createShipment.services.temperatureControlDesc',
    },
  ] as const;
}
