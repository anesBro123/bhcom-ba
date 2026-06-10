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
import { ADMIN_EMPLOYEES_URL } from '../../../../../shared/constants/app-urls';

import { AdminEmployeeForm, AdminEmployeeFormEditActions } from './employee.form';
import type { EmployeeFormModel } from '../data/employee.model';
import { AdminEmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employee-form-page',
  imports: [ReactiveFormsModule, FormPageComponent],
  templateUrl: './employee-form-page.component.html',
  styleUrl: './employee-form-page.component.scss',
})
export class EmployeeFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(AdminEmployeeService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly employeeId = signal<string | null>(null);
  protected readonly stepperDataReady = signal(false);

  protected readonly isEdit = computed(() => this.employeeId() !== null);

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...AdminEmployeeForm,
      titleKey: editing
        ? 'portal.admin.features.employees.form.titleEdit'
        : 'portal.admin.features.employees.form.titleCreate',
      actions: {
        ...AdminEmployeeForm.actions,
        submit: editing
          ? AdminEmployeeFormEditActions.submit
          : AdminEmployeeForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.stepperDataReady.set(true);
      return;
    }

    this.employeeId.set(id);
    this.employeeService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (employee) => {
          const { id: _id, ...formValue } = employee;
          queueMicrotask(() => {
            this.form.patchValue(formValue);
            this.stepperDataReady.set(true);
          });
        },
        error: () => {
          void this.router.navigateByUrl(ADMIN_EMPLOYEES_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as EmployeeFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.employeeService.update(this.employeeId()!, payload)
      : this.employeeService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(ADMIN_EMPLOYEES_URL);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: [''],
      jmbg: [''],
      canCreateShipment: [false],
      canAcceptShipment: [false],
      canCreateRoute: [false],
      canAcceptRoute: [false],
    });
  }
}
