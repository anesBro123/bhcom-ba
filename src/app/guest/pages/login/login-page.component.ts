import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { PORTAL_CONFIG } from '../../../portal/common/models/portal-config.model';
import { FormPageComponent } from '../../../shared/form';
import { SIGN_IN_URL } from '../../guest.constants';
import { LoginForm } from './login.form';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormPageComponent,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly portal = inject(PORTAL_CONFIG);

  protected readonly formDef = LoginForm;
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly submitting = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected get portalClass(): string {
    return this.portal.portal === 'admin' ? 'login--admin' : 'login--employee';
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const { username, password } = this.form.getRawValue();
    const login$ =
      this.portal.portal === 'admin'
        ? this.auth.loginAdmin({ username, password })
        : this.auth.loginEmployee({ username, password });

    this.submitting.set(true);
    this.errorKey.set(null);

    login$.subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(this.portal.homeUrl);
      },
      error: () => {
        this.submitting.set(false);
        this.errorKey.set('login.error');
      },
    });
  }
}
