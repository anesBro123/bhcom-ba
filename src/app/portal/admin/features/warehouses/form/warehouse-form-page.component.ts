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
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import { AdminWarehouseForm, AdminWarehouseFormEditActions } from './warehouse.form';
import type { WarehouseFormModel } from '../data/warehouse.model';
import { AdminWarehouseService } from '../data/warehouse.service';
import { AdminPageIcons } from '../../../admin-page-icons';

@Component({
  selector: 'app-warehouse-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageBackLinkComponent, PageTitleComponent],
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
  protected readonly stepperDataReady = signal(false);

  protected readonly isEdit = computed(() => this.warehouseId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit()
      ? 'portal.admin.pages.editWarehouse.title'
      : 'portal.admin.pages.createWarehouse.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit()
      ? 'portal.admin.pages.editWarehouse.subtitle'
      : 'portal.admin.pages.createWarehouse.subtitle',
  );

  protected readonly pageIcon = AdminPageIcons.warehouses;
  protected readonly backUrl = ADMIN_WAREHOUSES_URL;
  protected readonly backLabelKey = 'portal.admin.nav.allWarehouses';

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...AdminWarehouseForm,
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
      this.stepperDataReady.set(true);
      return;
    }

    this.warehouseId.set(id);
    this.warehouseService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (warehouse) => {
          const { id: _id, ...formValue } = warehouse;
          queueMicrotask(() => {
            this.form.patchValue(formValue);
            this.stepperDataReady.set(true);
          });
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
