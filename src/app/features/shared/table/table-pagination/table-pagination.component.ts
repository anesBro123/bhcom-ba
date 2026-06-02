import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-table-pagination',
  imports: [TranslatePipe],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
})
export class TablePaginationComponent {
  page = input.required<number>();
  pageSize = input.required<number>();
  total = input.required<number>();
  summaryKey = input.required<string>();
  entityKey = input.required<string>();

  pageChange = output<number>();

  protected readonly rangeFrom = computed(() => {
    const total = this.total();
    if (total === 0) {
      return 0;
    }

    return (this.page() - 1) * this.pageSize() + 1;
  });

  protected readonly rangeTo = computed(() => {
    const total = this.total();
    if (total === 0) {
      return 0;
    }

    return Math.min(this.page() * this.pageSize(), total);
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  protected readonly canGoPrevious = computed(() => this.page() > 1);
  protected readonly canGoNext = computed(() => this.page() < this.totalPages());

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) {
      return;
    }

    this.pageChange.emit(page);
  }

  protected previousPage(): void {
    if (this.canGoPrevious()) {
      this.pageChange.emit(this.page() - 1);
    }
  }

  protected nextPage(): void {
    if (this.canGoNext()) {
      this.pageChange.emit(this.page() + 1);
    }
  }
}
