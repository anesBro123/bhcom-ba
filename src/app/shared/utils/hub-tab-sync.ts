import type { DestroyRef, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export function syncHubEntityTab<T extends string>(
  route: ActivatedRoute,
  destroyRef: DestroyRef,
  parseTab: (value: string | null | undefined) => T,
  activeTab: WritableSignal<T>,
): void {
  route.queryParamMap
    .pipe(
      map((params) => parseTab(params.get('tab'))),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe((tab) => activeTab.set(tab));
}
