import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Portal } from '../portal/portal.model';
import { LoginCredentials, Session } from './auth.model';
import { AUTH_STORAGE_KEY } from './auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<Session | null>(this.loadSession());

  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => this._session() !== null);
  readonly portal = computed(() => this._session()?.portal ?? null);
  readonly token = computed(() => this._session()?.accessToken ?? null);
  readonly user = computed(() => this._session()?.user ?? null);

  loginEmployee(credentials: LoginCredentials): Observable<Session> {
    return this.loginStub('employee', credentials);
  }

  loginAdmin(credentials: LoginCredentials): Observable<Session> {
    return this.loginStub('admin', credentials);
  }

  logout(): void {
    this._session.set(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  private loginStub(portal: Portal, credentials: LoginCredentials): Observable<Session> {
    const session: Session = {
      accessToken: `stub-${portal}-${Date.now()}`,
      portal,
      user: {
        id: `${portal}-${credentials.username}`,
        username: credentials.username,
        displayName: credentials.username,
      },
    };
    return of(session).pipe(tap((s) => this.persistSession(s)));
  }

  private persistSession(session: Session): void {
    this._session.set(session);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  private loadSession(): Session | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as Session;
      if (
        parsed?.accessToken &&
        (parsed.portal === 'admin' || parsed.portal === 'employee') &&
        parsed.user
      ) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }
}
