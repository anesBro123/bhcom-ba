import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import type {
  ActiveDetailModalRequest,
  DetailDefinition,
  DetailModalOptions,
  DetailModalResult,
  ResolvedDetailModalOptions,
} from './detail-modal.types';
import { DETAIL_MODAL_CLOSE_ACTION_ID } from './detail-modal.constants';

@Injectable({ providedIn: 'root' })
export class DetailModalService {
  private readonly appRef = inject(ApplicationRef);
  private readonly _request = signal<ActiveDetailModalRequest | null>(null);

  readonly request = this._request.asReadonly();

  open<T extends object>(options: DetailModalOptions<T>): Observable<DetailModalResult> {
    return new Observable<DetailModalResult>((subscriber) => {
      this.dismissActive({ actionId: DETAIL_MODAL_CLOSE_ACTION_ID });

      const resolved = this.resolveOptions(options);
      let settled = false;

      const resolve = (result: DetailModalResult): void => {
        if (settled) {
          return;
        }

        settled = true;
        this._request.set(null);
        subscriber.next(result);
        subscriber.complete();
      };

      this._request.set({ options: resolved, resolve });
      this.appRef.tick();

      return () => {
        if (!settled) {
          resolve({ actionId: DETAIL_MODAL_CLOSE_ACTION_ID });
        }
      };
    });
  }

  resolve(result: DetailModalResult): void {
    const active = this._request();
    if (!active) {
      return;
    }

    active.resolve(result);
  }

  private dismissActive(result: DetailModalResult): void {
    const active = this._request();
    if (active) {
      active.resolve(result);
    }
  }

  private resolveOptions<T extends object>(options: DetailModalOptions<T>): ResolvedDetailModalOptions<object> {
    return {
      titleKey: options.titleKey,
      subtitleKey: options.subtitleKey,
      subtitleParams: options.subtitleParams,
      definition: options.definition as DetailDefinition<object>,
      data: options.data,
      actions: options.actions,
    };
  }
}
