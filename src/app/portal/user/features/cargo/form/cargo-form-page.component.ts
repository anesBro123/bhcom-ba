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
import { USER_CARGO_URL } from '../../../../../shared/constants/app-urls';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import type { CargoFormModel } from '../data/cargo.model';
import { UserCargoService } from '../data/cargo.service';
import { CargoForm, CargoFormEditActions } from './cargo.form';

@Component({
  selector: 'app-cargo-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageTitleComponent],
  templateUrl: './cargo-form-page.component.html',
  styleUrl: './cargo-form-page.component.scss',
})
export class CargoFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cargoService = inject(UserCargoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly entityId = signal<string | null>(null);

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editCargo.title' : 'portal.user.pages.createCargo.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editCargo.subtitle' : 'portal.user.pages.createCargo.subtitle',
  );

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...CargoForm,
      actions: {
        ...CargoForm.actions,
        submit: editing ? CargoFormEditActions.submit : CargoForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.entityId.set(id);
    this.cargoService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          const { id: _id, publishedAt: _publishedAt, ...formValue } = item;
          queueMicrotask(() => this.form.patchValue(formValue));
        },
        error: () => {
          void this.router.navigateByUrl(USER_CARGO_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as CargoFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.cargoService.update(this.entityId()!, payload)
      : this.cargoService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(USER_CARGO_URL);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      neededByDate: ['', Validators.required],
      size: ['', Validators.required],
      weightKg: [null as number | null, Validators.required],
      cargoType: ['pallet', Validators.required],
      description: [''],
    });
  }
}
