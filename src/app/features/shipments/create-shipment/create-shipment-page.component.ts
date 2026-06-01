import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  FormFieldTemplateDirective,
  FormPageComponent,
  FormSectionTemplateDirective,
  FormStepTemplateDirective,
  formFieldKey,
  formSectionKey,
  formStepKey,
} from '../../../core/form';

import { DeliveryPriorityCardsComponent } from './components/delivery-priority-cards/delivery-priority-cards.component';
import { PackageItemsSectionComponent } from './components/package-items-section/package-items-section.component';
import { ShipmentReviewStepComponent } from './components/shipment-review-step/shipment-review-step.component';
import { ShipmentServicesSectionComponent } from './components/shipment-services-section/shipment-services-section.component';
import { CreateShipmentForm } from './create-shipment.form';
import type { CreateShipmentFormModel } from './create-shipment.model';

@Component({
  selector: 'app-create-shipment-page',
  imports: [
    ReactiveFormsModule,
    FormPageComponent,
    FormFieldTemplateDirective,
    FormStepTemplateDirective,
    FormSectionTemplateDirective,
    DeliveryPriorityCardsComponent,
    PackageItemsSectionComponent,
    ShipmentServicesSectionComponent,
    ShipmentReviewStepComponent,
  ],
  templateUrl: './create-shipment-page.component.html',
  styleUrl: './create-shipment-page.component.scss',
})
export class CreateShipmentPageComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly formDef = CreateShipmentForm;
  protected readonly form = this.buildForm();

  protected readonly priorityFieldKey = formFieldKey(
    CreateShipmentForm,
    'type',
    'shipmentType',
    'deliveryPriority',
  );
  protected readonly packageSectionKey = formSectionKey(CreateShipmentForm, 'packages', 'items');
  protected readonly servicesSectionKey = formSectionKey(
    CreateShipmentForm,
    'services',
    'options',
  );
  protected readonly reviewStepKey = formStepKey(CreateShipmentForm, 'review');

  protected onCreate(): void {
    const payload = this.form.getRawValue() as CreateShipmentFormModel;
    console.info('Create shipment', payload);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      shipmentType: ['standard_package', Validators.required],
      deliveryPriority: ['standard', Validators.required],
      pickupDate: ['', Validators.required],
      deliveryDate: [''],

      originCompany: ['', Validators.required],
      originContact: ['', Validators.required],
      originAddress1: ['', Validators.required],
      originAddress2: [''],
      originCity: ['', Validators.required],
      originState: ['', Validators.required],
      originZip: ['', Validators.required],
      originPhone: ['', Validators.required],
      originEmail: ['', [Validators.required, Validators.email]],

      destinationCompany: ['', Validators.required],
      destinationContact: ['', Validators.required],
      destinationAddress1: ['', Validators.required],
      destinationAddress2: [''],
      destinationCity: ['', Validators.required],
      destinationState: ['', Validators.required],
      destinationZip: ['', Validators.required],
      destinationPhone: ['', Validators.required],
      destinationEmail: ['', [Validators.required, Validators.email]],

      items: this.fb.array([this.createItemGroup()]),

      insuranceCoverage: [false],
      signatureRequired: [false],
      fragileHandling: [false],
      temperatureControl: [false],
      preferredCarrier: [''],
      serviceLevel: [''],
      specialInstructions: [''],
    });
  }

  private createItemGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      category: ['general', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      value: [0, [Validators.required, Validators.min(0)]],
      hazardous: [false],
      length: [0, [Validators.required, Validators.min(0)]],
      width: [0, [Validators.required, Validators.min(0)]],
      height: [0, [Validators.required, Validators.min(0)]],
    });
  }
}
