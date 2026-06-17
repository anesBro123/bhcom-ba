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
import { USER_ROUTES_URL } from '../../../../../shared/constants/app-urls';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';
import { CompanyVehicleService } from '../../../data/company-vehicle.service';

import type { RouteFormModel } from '../data/route.model';
import { UserRouteService } from '../data/route.service';
import { buildRouteForm, RouteForm, RouteFormEditActions } from './route.form';

@Component({
  selector: 'app-route-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageTitleComponent],
  templateUrl: './route-form-page.component.html',
  styleUrl: './route-form-page.component.scss',
})
export class RouteFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly routeService = inject(UserRouteService);
  private readonly companyVehicleService = inject(CompanyVehicleService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly entityId = signal<string | null>(null);
  protected readonly vehicleOptions = signal<{ value: string; label?: string }[]>([]);

  protected readonly isEdit = computed(() => this.entityId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editRoute.title' : 'portal.user.pages.createRoute.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit() ? 'portal.user.pages.editRoute.subtitle' : 'portal.user.pages.createRoute.subtitle',
  );

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    const base = buildRouteForm(this.vehicleOptions());
    return {
      ...base,
      actions: {
        ...RouteForm.actions,
        submit: editing ? RouteFormEditActions.submit : RouteForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    this.companyVehicleService
      .listForSelect()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => this.vehicleOptions.set(options));

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.entityId.set(id);
    this.routeService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (item) => {
          const { id: _id, vehicleLabel: _label, publishedAt: _publishedAt, ...formValue } = item;
          queueMicrotask(() => this.form.patchValue(formValue));
        },
        error: () => {
          void this.router.navigateByUrl(USER_ROUTES_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as RouteFormModel;
    const vehicleLabel = this.companyVehicleService.getLabel(payload.vehicleId);
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.routeService.update(this.entityId()!, { ...payload, vehicleLabel })
      : this.routeService.create({ ...payload, vehicleLabel });

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(USER_ROUTES_URL);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      vehicleId: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      transportDate: ['', Validators.required],
      description: [''],
    });
  }
}
