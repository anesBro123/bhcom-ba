import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import type { RegisterCompanyPayload } from './register-company.model';

@Injectable({ providedIn: 'root' })
export class RegisterCompanyService {
  register(payload: RegisterCompanyPayload): Observable<void> {
    return of(undefined).pipe(
      delay(600),
      tap(() => console.info('Company registration submitted', payload.email)),
    );
  }
}
