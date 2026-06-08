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
      labelKey: 'portal.employee.features.shipments.form.services.insuranceCoverage',
      descriptionKey: 'portal.employee.features.shipments.form.services.insuranceCoverageDesc',
    },
    {
      key: 'signatureRequired',
      labelKey: 'portal.employee.features.shipments.form.services.signatureRequired',
      descriptionKey: 'portal.employee.features.shipments.form.services.signatureRequiredDesc',
    },
    {
      key: 'fragileHandling',
      labelKey: 'portal.employee.features.shipments.form.services.fragileHandling',
      descriptionKey: 'portal.employee.features.shipments.form.services.fragileHandlingDesc',
    },
    {
      key: 'temperatureControl',
      labelKey: 'portal.employee.features.shipments.form.services.temperatureControl',
      descriptionKey: 'portal.employee.features.shipments.form.services.temperatureControlDesc',
    },
  ] as const;
}
