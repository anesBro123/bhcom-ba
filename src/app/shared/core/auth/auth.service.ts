import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import type { PortalKind } from '../../constants/portal-kind.type';
import { DEMO_COMPANY_ID } from '../../constants/user-list-scope';
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

  loginUser(credentials: { username: string; password: string }): Observable<Session> {
    return this.loginStub('user', credentials);
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
        companyId: portalKind === 'user' ? DEMO_COMPANY_ID : 'admin-org',
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
      const parsed = JSON.parse(raw) as Session & { portal?: string; portalKind?: string };
      const rawKind = String(parsed.portalKind ?? parsed.portal ?? '');
      const portalKind: PortalKind | null =
        rawKind === 'employee' || rawKind === 'user'
          ? 'user'
          : rawKind === 'admin'
            ? 'admin'
            : null;
      if (!portalKind || !parsed?.accessToken || !parsed.user) {
        return null;
      }
      const user = {
        ...parsed.user,
        companyId: parsed.user.companyId ?? DEMO_COMPANY_ID,
      };
      return { accessToken: parsed.accessToken, portalKind, user };
    } catch {
      return null;
    }
  }
}
