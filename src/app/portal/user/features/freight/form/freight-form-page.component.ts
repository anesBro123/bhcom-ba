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
import { USER_OUR_FREIGHT_URL } from '../../../../../shared/constants/app-urls';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { notPastDateValidator } from '../../../../../shared/utils/date-input';

import type { FreightFormModel, FreightType } from '../data/freight.model';
import { UserFreightService } from '../data/freight.service';
import { UserPageIcons } from '../../../user-page-icons';
import { buildFreightForm, FreightForm, FreightFormEditActions } from './freight.form';

@Component({
  selector: 'app-freight-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageBackLinkComponent, PageTitleComponent],
  templateUrl: './freight-form-page.component.html',
  styleUrl: './freight-form-page.component.scss',
})
export class FreightFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cargoService = inject(UserFreightService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly entityId = signal<string | null>(null);
  protected readonly freightType = signal<FreightType>('pallet');

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editFreight.title' : 'portal.user.pages.createFreight.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editFreight.subtitle' : 'portal.user.pages.createFreight.subtitle',
  );

  protected readonly pageIcon = UserPageIcons.freight;
  protected readonly backUrl = USER_OUR_FREIGHT_URL;
  protected readonly backLabelKey = 'portal.user.nav.ourFreight';

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    const base = buildFreightForm(this.freightType());
    return {
      ...base,
      actions: {
        ...FreightForm.actions,
        submit: editing ? FreightFormEditActions.submit : FreightForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    this.form
      .get('freightType')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.freightType.set(value as FreightType);
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
            this.freightType.set(item.freightType);
            this.form.patchValue(formValue);
          });
        },
        error: () => {
          void this.router.navigateByUrl(USER_OUR_FREIGHT_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as FreightFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.cargoService.update(this.entityId()!, payload)
      : this.cargoService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(USER_OUR_FREIGHT_URL);
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
      freightType: ['pallet' as FreightType, Validators.required],
      description: [''],
    });
  }
}
