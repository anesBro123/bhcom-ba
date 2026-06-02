import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/auth.service';
import {
  ADMIN_PORTAL_CONFIG,
  EMPLOYEE_PORTAL_CONFIG,
  PORTAL_CONFIG,
} from '../../core/portal';
import { FormPageComponent } from '../../features/shared/form';
import { LanguagePickerComponent } from '../../layout/language-picker/language-picker.component';
import { ThemePickerComponent } from '../../layout/theme-picker/theme-picker.component';
import { LoginForm } from './login.form';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormPageComponent,
    TranslatePipe,
    RouterLink,
    ThemePickerComponent,
    LanguagePickerComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly portal = inject(PORTAL_CONFIG);

  protected readonly formDef = LoginForm;
  protected readonly submitting = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected get portalClass(): string {
    return this.portal.portal === 'admin' ? 'login--admin' : 'login--employee';
  }

  protected get alternateLoginUrl(): string {
    return this.portal.portal === 'admin'
      ? EMPLOYEE_PORTAL_CONFIG.loginUrl
      : ADMIN_PORTAL_CONFIG.loginUrl;
  }

  protected get switchPortalKey(): string {
    return this.portal.portal === 'admin' ? 'login.switchToEmployee' : 'login.switchToAdmin';
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
