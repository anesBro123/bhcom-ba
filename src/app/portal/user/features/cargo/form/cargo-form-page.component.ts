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
import { USER_MY_CARGO_URL } from '../../../../../shared/constants/app-urls';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { notPastDateValidator } from '../../../../../shared/utils/date-input';

import type { CargoFormModel, CargoType } from '../data/cargo.model';
import { UserCargoService } from '../data/cargo.service';
import { UserPageIcons } from '../../../user-page-icons';
import { buildCargoForm, CargoForm, CargoFormEditActions } from './cargo.form';

@Component({
  selector: 'app-cargo-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageBackLinkComponent, PageTitleComponent],
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
  protected readonly cargoType = signal<CargoType>('pallet');

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editCargo.title' : 'portal.user.pages.createCargo.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editCargo.subtitle' : 'portal.user.pages.createCargo.subtitle',
  );

  protected readonly pageIcon = UserPageIcons.cargo;
  protected readonly backUrl = USER_MY_CARGO_URL;
  protected readonly backLabelKey = 'portal.user.nav.myCargo';

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    const base = buildCargoForm(this.cargoType());
    return {
      ...base,
      actions: {
        ...CargoForm.actions,
        submit: editing ? CargoFormEditActions.submit : CargoForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    this.form
      .get('cargoType')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.cargoType.set(value as CargoType);
        }
      });

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
          queueMicrotask(() => {
            this.cargoType.set(item.cargoType);
            this.form.patchValue(formValue);
          });
        },
        error: () => {
          void this.router.navigateByUrl(USER_MY_CARGO_URL);
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
        void this.router.navigateByUrl(USER_MY_CARGO_URL);
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
      neededByDate: ['', [Validators.required, notPastDateValidator()]],
      size: [null as number | null, Validators.required],
      weightKg: [null as number | null, Validators.required],
      cargoType: ['pallet' as CargoType, Validators.required],
      description: [''],
    });
  }
}
