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
import { userOurListingsUrl } from '../../../../../shared/constants/app-urls';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import {
  endDateOnOrAfterStartValidator,
  notPastDateValidator,
} from '../../../../../shared/utils/date-input';
import { CompanyWarehouseService } from '../../../data/company-warehouse.service';

import type { WarehouseFormModel } from '../data/warehouse.model';
import { UserWarehouseService } from '../data/warehouse.service';
import { UserPageIcons } from '../../../user-page-icons';
import { buildWarehouseForm, WarehouseForm, WarehouseFormEditActions } from './warehouse.form';

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
  private readonly storageService = inject(UserWarehouseService);
  private readonly companyWarehouseService = inject(CompanyWarehouseService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly entityId = signal<string | null>(null);
  protected readonly warehouseOptions = signal<{ value: string; label?: string }[]>([]);

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editWarehouse.title' : 'portal.user.pages.createWarehouse.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editWarehouse.subtitle' : 'portal.user.pages.createWarehouse.subtitle',
  );

  protected readonly pageIcon = UserPageIcons.warehouse;
  protected readonly backUrl = userOurListingsUrl('warehouse');
  protected readonly backLabelKey = 'portal.user.nav.ourWarehouse';

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    const base = buildWarehouseForm(this.warehouseOptions());
    return {
      ...base,
      actions: {
        ...WarehouseForm.actions,
        submit: editing ? WarehouseFormEditActions.submit : WarehouseForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    this.companyWarehouseService
      .listForSelect()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => this.warehouseOptions.set(options));

    this.form
      .get('availableFrom')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.form.get('availableTo')?.updateValueAndValidity({ emitEvent: false }));

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.entityId.set(id);
    this.storageService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          const { id: _id, warehouseLabel: _label, publishedAt: _publishedAt, ...formValue } = item;
          queueMicrotask(() => this.form.patchValue(formValue));
        },
        error: () => {
          void this.router.navigateByUrl(userOurListingsUrl('warehouse'));
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as WarehouseFormModel;
    const { name: warehouseName, city: warehouseCity } = this.companyWarehouseService.getDisplay(
      payload.warehouseId,
    );
    const warehouseLabel = this.companyWarehouseService.getLabel(payload.warehouseId);
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.storageService.update(this.entityId()!, {
          ...payload,
          warehouseLabel,
          warehouseName,
          warehouseCity,
        })
      : this.storageService.create({ ...payload, warehouseLabel, warehouseName, warehouseCity });

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(userOurListingsUrl('warehouse'));
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      warehouseId: ['', Validators.required],
      availableFrom: ['', [Validators.required, notPastDateValidator()]],
      availableTo: ['', [Validators.required, endDateOnOrAfterStartValidator('availableFrom')]],
      spaceM2: [null as number | null, Validators.required],
      description: [''],
    });
  }
}
