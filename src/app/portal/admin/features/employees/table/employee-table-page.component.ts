import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';

import { ConfirmService } from '../../../../../shared/confirm';
import { adminEditEmployeeUrl } from '../../../../../shared/constants/app-urls';

import {
  DataTableComponent,
  type RowActionEvent,
  type TableLoader,
} from '../../../../../shared/table';

import type { Employee } from '../data/employee.model';
import { AdminEmployeeService } from '../data/employee.service';
import { EmployeeTable } from './employee.table';

@Component({
  selector: 'app-employee-table-page',
  imports: [DataTableComponent],
  templateUrl: './employee-table-page.component.html',
  styleUrl: './employee-table-page.component.scss',
})
export class EmployeeTablePageComponent {
  private readonly employeeService = inject(AdminEmployeeService);
  private readonly confirmService = inject(ConfirmService);
  private readonly router = inject(Router);

  protected readonly table = EmployeeTable;
  protected readonly tableMounted = signal(true);

  protected readonly loadEmployees: TableLoader<Employee> = (query) =>
    this.employeeService.list(query);

  protected onRowAction(event: RowActionEvent<Employee>): void {
    switch (event.actionId) {
      case 'edit':
        void this.router.navigateByUrl(adminEditEmployeeUrl(event.row.id));
        break;
      case 'delete':
        this.confirmService
          .confirm({
            titleKey: 'portal.admin.features.employees.table.deleteConfirm.title',
            messageKey: 'portal.admin.features.employees.table.deleteConfirm.message',
            danger: true,
          })
          .pipe(
            filter(Boolean),
            take(1),
            switchMap(() => this.employeeService.delete(event.row.id)),
          )
          .subscribe({
            next: () => this.refreshTable(),
          });
        break;
    }
  }

  private refreshTable(): void {
    this.tableMounted.set(false);
    queueMicrotask(() => this.tableMounted.set(true));
  }
}
