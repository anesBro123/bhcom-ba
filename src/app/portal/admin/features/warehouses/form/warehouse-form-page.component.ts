import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormPageComponent } from '../../../../../shared/form';
import { ADMIN_WAREHOUSES_URL } from '../../../../../shared/constants/app-urls';

import { AdminWarehouseForm, AdminWarehouseFormEditActions } from './warehouse.form';
import type { WarehouseFormModel } from '../data/warehouse.model';
import { AdminWarehouseService } from '../data/warehouse.service';

@Component({
  selector: 'app-warehouse-form-page',
  imports: [ReactiveFormsModule, FormPageComponent],
  templateUrl: './warehouse-form-page.component.html',
  styleUrl: './warehouse-form-page.component.scss',
})
export class WarehouseFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly warehouseService = inject(AdminWarehouseService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly warehouseId = signal<string | null>(null);

  protected readonly isEdit = computed(() => this.warehouseId() !== null);

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...AdminWarehouseForm,
      titleKey: editing
        ? 'portal.admin.features.warehouses.form.titleEdit'
        : 'portal.admin.features.warehouses.form.titleCreate',
      actions: {
        ...AdminWarehouseForm.actions,
        submit: editing
          ? AdminWarehouseFormEditActions.submit
          : AdminWarehouseForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.warehouseId.set(id);
    this.warehouseService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (warehouse) => {
          const { id: _id, ...formValue } = warehouse;
          queueMicrotask(() => this.form.patchValue(formValue));
        },
        error: () => {
          void this.router.navigateByUrl(ADMIN_WAREHOUSES_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as WarehouseFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.warehouseService.update(this.warehouseId()!, payload)
      : this.warehouseService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(ADMIN_WAREHOUSES_URL);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      address: [''],
      city: [''],
      country: [''],
      capacityM2: [null as number | null],
      type: ['' as WarehouseFormModel['type']],
      height: [null as number | null],
      enclosed: [false],
      cameras: [false],
      ramp: [false],
      physicalSecurity: [false],
      floorCount: [null as number | null],
      rackCount: [null as number | null],
    });
  }
}
