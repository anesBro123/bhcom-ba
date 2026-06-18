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
import { USER_MY_STORAGE_URL } from '../../../../../shared/constants/app-urls';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import {
  endDateOnOrAfterStartValidator,
  notPastDateValidator,
} from '../../../../../shared/utils/date-input';
import { CompanyWarehouseService } from '../../../data/company-warehouse.service';

import type { StorageFormModel } from '../data/storage.model';
import { UserStorageService } from '../data/storage.service';
import { UserPageIcons } from '../../../user-page-icons';
import { buildStorageForm, StorageForm, StorageFormEditActions } from './storage.form';

@Component({
  selector: 'app-storage-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageBackLinkComponent, PageTitleComponent],
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

  protected readonly pageIcon = UserPageIcons.storage;
  protected readonly backUrl = USER_MY_STORAGE_URL;
  protected readonly backLabelKey = 'portal.user.nav.myStorage';

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
          void this.router.navigateByUrl(USER_MY_STORAGE_URL);
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
        void this.router.navigateByUrl(USER_MY_STORAGE_URL);
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
