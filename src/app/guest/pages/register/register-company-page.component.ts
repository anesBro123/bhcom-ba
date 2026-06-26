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
import { SIGN_IN_URL } from '../../../shared/constants/app-urls';
import { FormPageComponent } from '../../../shared/form';
import { RegisterCompanyForm } from './register-company.form';
import type { RegisterCompanyFormModel } from './register-company.model';
import { RegisterCompanyService } from './register-company.service';

@Component({
  selector: 'app-register-company-page',
  imports: [
    ReactiveFormsModule,
    FormPageComponent,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './register-company-page.component.html',
  styleUrl: './register-company-page.component.scss',
})
export class RegisterCompanyPageComponent {
  private readonly registerCompany = inject(RegisterCompanyService);
  private readonly fb = inject(FormBuilder);

  protected readonly formDef = RegisterCompanyForm;
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = this.buildForm();

  protected onSubmit(): void {
    if (this.submitting() || this.submitted()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { passwordConfirm: _passwordConfirm, ...payload } =
      this.form.getRawValue() as RegisterCompanyFormModel;

    this.submitting.set(true);
    this.errorKey.set(null);

    this.registerCompany.register(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.submitting.set(false);
        this.errorKey.set('guest.register.error');
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
