import { Component, computed, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideChevronDown, LucidePlus } from '@lucide/angular';

import { FormSectionComponent } from '../../../../../shared/form';
import { PACKAGE_CATEGORY_OPTIONS } from '../../create-shipment.constants';
import { packageTotals } from '../../create-shipment.utils';
import type { CreateShipmentFormModel } from '../../create-shipment.model';

@Component({
  selector: 'app-package-items-section',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormSectionComponent,
    LucidePlus,
    LucideChevronDown,
  ],
  templateUrl: './package-items-section.component.html',
  styleUrl: './package-items-section.component.scss',
})
export class PackageItemsSectionComponent {
  private readonly fb = new FormBuilder();

  readonly form = input.required<FormGroup>();
  readonly value = input.required<Partial<CreateShipmentFormModel>>();

  protected readonly categories = PACKAGE_CATEGORY_OPTIONS;

  protected readonly totals = computed(() => packageTotals(this.value()));

  protected items(): FormArray {
    return this.form().get('items') as FormArray;
  }

  protected itemGroup(index: number): FormGroup {
    return this.items().at(index) as FormGroup;
  }

  protected addItem(): void {
    this.items().push(this.createItemGroup());
  }

  protected createItemGroup(): FormGroup {
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
