import { DestroyRef, Injector } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';

import { TableApiService } from './table-api.service';
import { TableStore } from './table.store';
import type { TableDefinition, TableLoader } from './table.types';

export function bindTableDataSource<T>(
  store: TableStore<T>,
  definition: TableDefinition<T>,
  loader: TableLoader<T> | undefined,
  api: TableApiService,
  destroyRef: DestroyRef,
  injector: Injector,
): Subscription {
  const load = loader ?? ((query) => api.load(definition, query));

  return toObservable(store.query, { injector })
    .pipe(
      tap(() => {
        store.setLoading(true);
        store.setError(null);
      }),
      switchMap((query) =>
        load(query).pipe(
          catchError(() => {
            store.setLoading(false);
            store.setError('tables.common.loadError');
            return of(null);
          }),
        ),
      ),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe((response) => {
      store.setLoading(false);

      if (!response) {
        return;
      }

      store.setRows(response.items, response.total);
    });
}
