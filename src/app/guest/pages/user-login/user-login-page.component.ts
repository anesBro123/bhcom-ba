import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { SIGN_IN_URL, USER_HOME_URL } from '../../../shared/constants/app-urls';
import { FormPageComponent } from '../../../shared/form';
import { LoginForm } from '../login/login.form';

@Component({
  selector: 'app-user-login-page',
  imports: [ReactiveFormsModule, FormPageComponent, TranslatePipe, RouterLink],
  templateUrl: './user-login-page.component.html',
  styleUrl: '../login/login-page.component.scss',
})
export class UserLoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly formDef = LoginForm;
  protected readonly signInUrl = SIGN_IN_URL;
  protected readonly submitting = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }

    const { username, password } = this.form.getRawValue();

    this.submitting.set(true);
    this.errorKey.set(null);

    this.auth.loginUser({ username, password }).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl(USER_HOME_URL);
      },
      error: () => {
        this.submitting.set(false);
        this.errorKey.set('guest.login.error');
      },
    });
  }
}
