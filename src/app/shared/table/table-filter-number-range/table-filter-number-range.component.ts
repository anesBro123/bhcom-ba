import { Component, HostListener, computed, input, output, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { isNarrowedNumberRange } from '../number-range-filter.utils';
import type { NumberRangeFilterValue } from '../table.types';

@Component({
  selector: 'app-table-filter-number-range',
  imports: [TranslatePipe],
  templateUrl: './table-filter-number-range.component.html',
  styleUrl: './table-filter-number-range.component.scss',
})
export class TableFilterNumberRangeComponent {
  readonly titleKey = input.required<string>();
  readonly value = input.required<NumberRangeFilterValue>();
  readonly min = input.required<number>();
  readonly max = input.required<number>();
  readonly step = input(1);
  readonly unitSuffixKey = input<string | undefined>(undefined);

  valueChange = output<NumberRangeFilterValue>();

  protected readonly showMinTooltip = signal(false);
  protected readonly showMaxTooltip = signal(false);

  private hoveringMin = false;
  private hoveringMax = false;
  private draggingMin = false;
  private draggingMax = false;

  constructor(private readonly translate: TranslateService) {}

  protected readonly isFiltering = computed(() =>
    isNarrowedNumberRange(this.value(), this.min(), this.max()),
  );

  protected currentMin(): number {
    return this.value().min ?? this.min();
  }

  protected currentMax(): number {
    return this.value().max ?? this.max();
  }

  protected rangeSummary(): string {
    if (!this.isFiltering()) {
      return this.translate.instant('shared.table.filters.anyRange');
    }

    const unit = this.unitSuffix();
    const range = `${this.formatValue(this.currentMin())} – ${this.formatValue(this.currentMax())}`;
    return unit ? `${range} ${unit}` : range;
  }

  protected fillLeftPercent(): number {
    const span = this.max() - this.min();
    if (span <= 0) {
      return 0;
    }

    return ((this.currentMin() - this.min()) / span) * 100;
  }

  protected fillWidthPercent(): number {
    const span = this.max() - this.min();
    if (span <= 0) {
      return 0;
    }

    return ((this.currentMax() - this.currentMin()) / span) * 100;
  }

  protected maxThumbPercent(): number {
    return this.fillLeftPercent() + this.fillWidthPercent();
  }

  protected onMinSlider(value: string): void {
    this.showMinTooltip.set(true);
    const parsed = Number(value);
    this.emitChange(this.normalizeRange({ ...this.value(), min: parsed }, 'min'));
  }

  protected onMaxSlider(value: string): void {
    this.showMaxTooltip.set(true);
    const parsed = Number(value);
    this.emitChange(this.normalizeRange({ ...this.value(), max: parsed }, 'max'));
  }

  protected onMinPointerDown(): void {
    this.draggingMin = true;
    this.showMinTooltip.set(true);
  }

  protected onMaxPointerDown(): void {
    this.draggingMax = true;
    this.showMaxTooltip.set(true);
  }

  protected onMinEnter(): void {
    this.hoveringMin = true;
    this.showMinTooltip.set(true);
  }

  protected onMinLeave(): void {
    this.hoveringMin = false;
    if (!this.draggingMin) {
      this.showMinTooltip.set(false);
    }
  }

  protected onMaxEnter(): void {
    this.hoveringMax = true;
    this.showMaxTooltip.set(true);
  }

  protected onMaxLeave(): void {
    this.hoveringMax = false;
    if (!this.draggingMax) {
      this.showMaxTooltip.set(false);
    }
  }

  @HostListener('document:pointerup')
  protected onDocumentPointerUp(): void {
    this.draggingMin = false;
    this.draggingMax = false;

    if (!this.hoveringMin) {
      this.showMinTooltip.set(false);
    }

    if (!this.hoveringMax) {
      this.showMaxTooltip.set(false);
    }
  }

  protected formatValue(value: number): string {
    const step = this.step();
    const decimals = step < 1 ? (String(step).split('.')[1]?.length ?? 1) : 0;

    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  protected tooltipValue(value: number): string {
    const formatted = this.formatValue(value);
    const unit = this.unitSuffix();
    return unit ? `${formatted} ${unit}` : formatted;
  }

  private unitSuffix(): string {
    const key = this.unitSuffixKey();
    return key ? this.translate.instant(key) : '';
  }

  private normalizeRange(
    partial: NumberRangeFilterValue,
    changed: 'min' | 'max',
  ): NumberRangeFilterValue {
    const boundMin = this.min();
    const boundMax = this.max();
    let min = partial.min;
    let max = partial.max;

    if (min !== undefined && !Number.isNaN(min)) {
      min = Math.max(boundMin, Math.min(boundMax, min));
    } else {
      min = undefined;
    }

    if (max !== undefined && !Number.isNaN(max)) {
      max = Math.max(boundMin, Math.min(boundMax, max));
    } else {
      max = undefined;
    }

    if (min !== undefined && max !== undefined && min > max) {
      if (changed === 'min') {
        min = max;
      } else {
        max = min;
      }
    }

    const cleaned: NumberRangeFilterValue = {};
    if (min !== undefined) {
      cleaned.min = min;
    }
    if (max !== undefined) {
      cleaned.max = max;
    }

    return cleaned;
  }

  private emitChange(next: NumberRangeFilterValue): void {
    if (!isNarrowedNumberRange(next, this.min(), this.max())) {
      this.valueChange.emit({});
      return;
    }

    this.valueChange.emit(next);
  }
}
