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
import { ADMIN_USERS_URL } from '../../../../../shared/constants/app-urls';

import { AdminUserForm, AdminUserFormEditActions } from './user.form';
import type { UserFormModel } from '../data/user.model';
import { AdminUserService } from '../data/user.service';

@Component({
  selector: 'app-user-form-page',
  imports: [ReactiveFormsModule, FormPageComponent],
  templateUrl: './user-form-page.component.html',
  styleUrl: './user-form-page.component.scss',
})
export class UserFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(AdminUserService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.buildForm();
  protected readonly submitting = signal(false);
  protected readonly userId = signal<string | null>(null);
  protected readonly stepperDataReady = signal(false);

  protected readonly isEdit = computed(() => this.userId() !== null);

  protected readonly formDef = computed(() => {
    const editing = this.isEdit();
    return {
      ...AdminUserForm,
      titleKey: editing
        ? 'portal.admin.features.users.form.titleEdit'
        : 'portal.admin.features.users.form.titleCreate',
      actions: {
        ...AdminUserForm.actions,
        submit: editing
          ? AdminUserFormEditActions.submit
          : AdminUserForm.actions.submit,
      },
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.stepperDataReady.set(true);
      return;
    }

    this.userId.set(id);
    this.userService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          const { id: _id, ...formValue } = user;
          queueMicrotask(() => {
            this.form.patchValue(formValue);
            this.stepperDataReady.set(true);
          });
        },
        error: () => {
          void this.router.navigateByUrl(ADMIN_USERS_URL);
        },
      });
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const payload = this.form.getRawValue() as UserFormModel;
    this.submitting.set(true);

    const request$ = this.isEdit()
      ? this.userService.update(this.userId()!, payload)
      : this.userService.create(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(ADMIN_USERS_URL);
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
