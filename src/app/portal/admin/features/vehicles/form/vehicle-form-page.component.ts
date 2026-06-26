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
import { adminHomeUrl } from '../../../../../shared/constants/app-urls';
import { PageBackLinkComponent } from '../../../../../shared/ui/page-back-link/page-back-link.component';
import { PageTitleComponent } from '../../../../../shared/ui/page-title/page-title.component';

import { AdminVehicleForm, AdminVehicleFormEditActions } from './vehicle.form';
import type { VehicleFormModel } from '../data/vehicle.model';
import { AdminVehicleService } from '../data/vehicle.service';
import { AdminPageIcons } from '../../../admin-page-icons';
import { ADMIN_HOME_BACK_LABEL_KEY } from '../../../common/admin-entity-detail-navigation';

@Component({
  selector: 'app-vehicle-form-page',
  imports: [ReactiveFormsModule, FormPageComponent, PageBackLinkComponent, PageTitleComponent],
  templateUrl: './vehicle-form-page.component.html',
  styleUrl: './vehicle-form-page.component.scss',
})
export class VehicleFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vehicleService = inject(AdminVehicleService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly vehicleId = signal<string | null>(null);
  protected readonly stepperDataReady = signal(false);

  protected readonly isEdit = computed(() => this.vehicleId() !== null);

  protected readonly pageTitleKey = computed(() =>
    this.isEdit()
      ? 'portal.admin.pages.editVehicle.title'
      : 'portal.admin.pages.createVehicle.title',
  );

  protected readonly pageSubtitleKey = computed(() =>
    this.isEdit()
      ? 'portal.admin.pages.editVehicle.subtitle'
      : 'portal.admin.pages.createVehicle.subtitle',
  );

  protected readonly pageIcon = AdminPageIcons.vehicles;
  protected readonly backUrl = adminHomeUrl('vehicles');
  protected readonly backLabelKey = ADMIN_HOME_BACK_LABEL_KEY;

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...AdminVehicleForm,
      actions: {
        ...AdminVehicleForm.actions,
        submit: editing
          ? AdminVehicleFormEditActions.submit
          : AdminVehicleForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.stepperDataReady.set(true);
      return;
    }

    this.vehicleId.set(id);
    this.vehicleService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (vehicle) => {
          const { id: _id, ...formValue } = vehicle;
          queueMicrotask(() => {
            this.form.patchValue(formValue);
            this.stepperDataReady.set(true);
          });
        },
        error: () => {
          void this.router.navigateByUrl(adminHomeUrl('vehicles'));
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as VehicleFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.vehicleService.update(this.vehicleId()!, payload)
      : this.vehicleService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(adminHomeUrl('vehicles'));
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      registarskaOznaka: ['', Validators.required],
      datumPrveRegistracije: [''],
      datumIzdavanjaDozvole: [''],
      brojDokumenta: [''],
      serijskiBrojDozvole: [''],

      vlasnikPrezime: [''],
      vlasnikIme: [''],
      vlasnikPrebivaliste: [''],
      korisnikPrezime: [''],
      korisnikIme: [''],
      korisnikPrebivaliste: [''],
      jmbgVlasnika: [''],
      jmbgKorisnika: [''],

      marka: ['', Validators.required],
      tipVozila: [''],
      komercijalnaOznaka: [''],
      brojSasije: ['', Validators.required],
      vehicleType: [''],
      boja: [''],

      najvecaDozvoljenaMasa: [null as number | null],
      masaVozila: [null as number | null],
      nosivostKg: [null as number | null],
      brojOsovina: [null as number | null],

      radnaZapremina: [null as number | null],
      snagaKw: [null as number | null],
      vrstaGoriva: [''],
      brojMotora: [''],
      odnosSnagaMasa: [null as number | null],

      vazenjeRegistracije: [''],
      homologacijskaOznaka: [''],
      brojMestaSedenje: [null as number | null],
      brojMestaStajanje: [null as number | null],
      zabranaOtudjenjaDo: [''],
      podaciNaCipu: [''],
    });
  }
}
