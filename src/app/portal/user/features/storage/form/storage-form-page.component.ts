import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormPageComponent } from '../../../../../shared/form';
import { USER_STORAGE_URL } from '../../../../../shared/constants/app-urls';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { CompanyWarehouseService } from '../../../data/company-warehouse.service';

import type { StorageFormModel } from '../data/storage.model';
import { UserStorageService } from '../data/storage.service';
import { buildStorageForm, StorageForm, StorageFormEditActions } from './storage.form';

@Component({
  selector: 'app-storage-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageTitleComponent],
  templateUrl: './storage-form-page.component.html',
  styleUrl: './storage-form-page.component.scss',
})
export class StorageFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly storageService = inject(UserStorageService);
  private readonly companyWarehouseService = inject(CompanyWarehouseService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly entityId = signal<string | null>(null);
  protected readonly warehouseOptions = signal<{ value: string; label?: string }[]>([]);

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editStorage.title' : 'portal.user.pages.createStorage.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editStorage.subtitle' : 'portal.user.pages.createStorage.subtitle',
  );

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    const base = buildStorageForm(this.warehouseOptions());
    return {
      ...base,
      actions: {
        ...StorageForm.actions,
        submit: editing ? StorageFormEditActions.submit : StorageForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    this.companyWarehouseService
      .listForSelect()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => this.warehouseOptions.set(options));

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
          void this.router.navigateByUrl(USER_STORAGE_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as StorageFormModel;
    const warehouseLabel = this.companyWarehouseService.getLabel(payload.warehouseId);
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.storageService.update(this.entityId()!, { ...payload, warehouseLabel })
      : this.storageService.create({ ...payload, warehouseLabel });

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(USER_STORAGE_URL);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group(
      {
        warehouseId: ['', Validators.required],
        availableFrom: ['', Validators.required],
        availableTo: ['', Validators.required],
        spaceM2: [null as number | null, Validators.required],
        description: [''],
      },
      { validators: storageDateRangeValidator },
    );
  }
}

function storageDateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const from = group.get('availableFrom')?.value as string | null;
  const to = group.get('availableTo')?.value as string | null;

  if (from && to && to < from) {
    return { dateRange: true };
  }

  return null;
}
