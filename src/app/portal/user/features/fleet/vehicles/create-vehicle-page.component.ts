import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormPageComponent } from '../../../../../shared/form';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import { CreateVehicleForm } from './create-vehicle.form';
import type { CreateVehicleFormModel } from './vehicle.model';

@Component({
  selector: 'app-create-vehicle-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageTitleComponent],
  templateUrl: './create-vehicle-page.component.html',
  styleUrl: './create-vehicle-page.component.scss',
})
export class CreateVehiclePageComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly formDef = CreateVehicleForm;
  protected readonly pageTitleKey = 'portal.user.pages.createVehicle.title';
  protected readonly pageSubtitleKey = 'portal.user.pages.createVehicle.subtitle';
  protected readonly form = this.buildForm();

  protected onCreate(): void {
    const payload = this.form.getRawValue() as CreateVehicleFormModel;
    console.info('Create vehicle', payload);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      plateNumber: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [null as number | null, Validators.required],
      vehicleType: ['', Validators.required],
      capacityKg: [null as number | null, Validators.required],
      status: ['active', Validators.required],
      notes: [''],
    });
  }
}
