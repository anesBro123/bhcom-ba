import type { IsActiveMatchOptions } from '@angular/router';

/** Match path only — ignore `?tab=` and other query params on hub routes. */
export function navLinkActiveOptions(exact = false): IsActiveMatchOptions {
  return {
    paths: exact ? 'exact' : 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };
}
