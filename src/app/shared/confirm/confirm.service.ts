import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIRM_CANCEL_LABEL_KEY, CONFIRM_CONFIRM_LABEL_KEY } from './confirm.constants';
import type { ActiveConfirmRequest, ConfirmOptions, ResolvedConfirmOptions } from './confirm.types';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly _request = signal<ActiveConfirmRequest | null>(null);

  readonly request = this._request.asReadonly();

  confirm(options: ConfirmOptions): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.dismissActive(false);

      const resolved = this.resolveOptions(options);
      let settled = false;

      const resolve = (confirmed: boolean): void => {
        if (settled) {
          return;
        }

        settled = true;
        this._request.set(null);
        subscriber.next(confirmed);
        subscriber.complete();
      };

      this._request.set({ options: resolved, resolve });

      return () => {
        if (!settled) {
          resolve(false);
        }
      };
    });
  }

  resolve(confirmed: boolean): void {
    const active = this._request();
    if (!active) {
      return;
    }

    active.resolve(confirmed);
  }

  private dismissActive(confirmed: boolean): void {
    const active = this._request();
    if (active) {
      active.resolve(confirmed);
    }
  }

  private resolveOptions(options: ConfirmOptions): ResolvedConfirmOptions {
    return {
      titleKey: options.titleKey,
      messageKey: options.messageKey,
      confirmLabelKey: options.confirmLabelKey ?? CONFIRM_CONFIRM_LABEL_KEY,
      cancelLabelKey: options.cancelLabelKey ?? CONFIRM_CANCEL_LABEL_KEY,
      danger: options.danger ?? false,
      messageParams: options.messageParams,
    };
  }
}
