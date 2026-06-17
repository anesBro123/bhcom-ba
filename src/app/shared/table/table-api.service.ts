import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { PaginatedResponse, TableDefinition, TableQuery } from './table.types';

@Injectable({ providedIn: 'root' })
export class TableApiService {
  private readonly http = inject(HttpClient);

  load<T>(definition: TableDefinition<T>, query: TableQuery): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.sortField && query.sortDirection) {
      params = params.set('sort', query.sortField).set('direction', query.sortDirection);
    }

    for (const [key, value] of Object.entries(query.filters)) {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return this.http.get<PaginatedResponse<T>>(definition.endpoint, { params });
  }
}
