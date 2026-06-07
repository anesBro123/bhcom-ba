import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import type { PortalKind } from '../../constants/portal-kind.type';
import { Session } from './auth.model';
import { AUTH_STORAGE_KEY } from './auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<Session | null>(this.loadSession());

  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => this._session() !== null);
  readonly portalKind = computed(() => this._session()?.portalKind ?? null);
  readonly token = computed(() => this._session()?.accessToken ?? null);
  readonly user = computed(() => this._session()?.user ?? null);

  loginEmployee(credentials: { username: string; password: string }): Observable<Session> {
    return this.loginStub('employee', credentials);
  }

  loginAdmin(credentials: { username: string; password: string }): Observable<Session> {
    return this.loginStub('admin', credentials);
  }

  logout(): void {
    this._session.set(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  private loginStub(
    portalKind: PortalKind,
    credentials: { username: string; password: string },
  ): Observable<Session> {
    const session: Session = {
      accessToken: `stub-${portalKind}-${Date.now()}`,
      portalKind,
      user: {
        id: `${portalKind}-${credentials.username}`,
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
      const parsed = JSON.parse(raw) as Session & { portal?: PortalKind };
      const portalKind = parsed.portalKind ?? parsed.portal;
      if (
        parsed?.accessToken &&
        (portalKind === 'admin' || portalKind === 'employee') &&
        parsed.user
      ) {
        return { accessToken: parsed.accessToken, portalKind, user: parsed.user };
      }
      return null;
    } catch {
      return null;
    }
  }
}
