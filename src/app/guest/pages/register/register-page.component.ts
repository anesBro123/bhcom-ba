import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { PORTAL_CONFIG } from '../../../portal/common/models/portal-config.model';
import { FormPageComponent } from '../../../shared/form';
import { LANDING_URL } from '../../guest.constants';
import { RegisterAdminForm } from './register-admin.form';
import type { RegisterAdminFormModel } from './register-admin.model';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    FormPageComponent,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  protected readonly portal = inject(PORTAL_CONFIG);

  protected readonly formDef = RegisterAdminForm;
  protected readonly landingUrl = LANDING_URL;
  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = this.buildForm();

  protected get loginUrl(): string {
    return this.portal.loginUrl;
  }

  protected onSubmit(): void {
    if (this.submitting() || this.submitted()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { passwordConfirm: _passwordConfirm, ...payload } =
      this.form.getRawValue() as RegisterAdminFormModel;

    this.submitting.set(true);
    this.errorKey.set(null);

    this.auth.registerAdmin(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.submitting.set(false);
        this.errorKey.set('register.error');
      },
    });
  }

  private buildForm(): FormGroup {
    const form = this.fb.group({
      title: ['mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, this.passwordConfirmValidator]],
      phone: ['', Validators.required],
      companyName: ['', Validators.required],
      vatId: ['', Validators.required],
      country: ['BA', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      address: ['', Validators.required],
    });

    form.get('password')?.valueChanges.subscribe(() => {
      form.get('passwordConfirm')?.updateValueAndValidity();
    });

    return form;
  }

  private passwordConfirmValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    if (!control.value || !password) {
      return null;
    }

    return control.value === password ? null : { passwordMismatch: true };
  }
}
