import {
  Component,
  ElementRef,
  HostListener,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { clampNumberRange, isNarrowedNumberRange, valueFromTrackPercent } from '../number-range-filter.utils';
import { TableFilterFieldComponent } from '../table-filter-field/table-filter-field.component';
import type { FilterSummary } from '../filter-chips.utils';
import type { NumberRangeFilterValue } from '../table.types';

const THUMB_SIZE_PX = 16;

@Component({
  selector: 'app-table-filter-number-range',
  imports: [TranslatePipe, TableFilterFieldComponent],
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
  readonly collapsible = input(false);
  readonly summary = input<FilterSummary>({ text: '', isPlaceholder: false });

  valueChange = output<NumberRangeFilterValue>();

  private readonly trackRef = viewChild<ElementRef<HTMLElement>>('track');

  protected readonly showMinTooltip = signal(false);
  protected readonly showMaxTooltip = signal(false);

  private activeThumb: 'min' | 'max' | null = null;
  private hoveringMin = false;
  private hoveringMax = false;

  constructor(private readonly translate: TranslateService) {}

  protected readonly isFiltering = computed(() =>
    isNarrowedNumberRange(this.value(), this.min(), this.max()),
  );

  protected clearRange(): void {
    this.valueChange.emit({});
  }

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

  protected minThumbPercent(): number {
    return this.valueToPercent(this.currentMin());
  }

  protected maxThumbPercent(): number {
    return this.valueToPercent(this.currentMax());
  }

  protected fillLeftPercent(): number {
    return this.minThumbPercent() * 100;
  }

  protected fillWidthPercent(): number {
    return (this.maxThumbPercent() - this.minThumbPercent()) * 100;
  }

  protected onTrackPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement).closest('.table-filter-number-range__thumb')) {
      return;
    }

    const track = this.trackRef()?.nativeElement;
    if (!track) {
      return;
    }

    const nextValue = this.valueFromPointer(event.clientX, track);
    const centerPercent = this.valueToPercent(nextValue) * 100;
    const midpoint = (this.minThumbPercent() + this.maxThumbPercent()) * 50;

    if (centerPercent <= midpoint) {
      this.showMinTooltip.set(true);
      this.emitChange(
        clampNumberRange({ ...this.value(), min: nextValue }, this.min(), this.max(), 'min'),
      );
    } else {
      this.showMaxTooltip.set(true);
      this.emitChange(
        clampNumberRange({ ...this.value(), max: nextValue }, this.min(), this.max(), 'max'),
      );
    }
  }

  protected onThumbPointerDown(event: PointerEvent, thumb: 'min' | 'max'): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeThumb = thumb;

    if (thumb === 'min') {
      this.showMinTooltip.set(true);
    } else {
      this.showMaxTooltip.set(true);
    }
  }

  protected onMinEnter(): void {
    this.hoveringMin = true;
    this.showMinTooltip.set(true);
  }

  protected onMinLeave(): void {
    this.hoveringMin = false;
    if (!this.activeThumb) {
      this.showMinTooltip.set(false);
    }
  }

  protected onMaxEnter(): void {
    this.hoveringMax = true;
    this.showMaxTooltip.set(true);
  }

  protected onMaxLeave(): void {
    this.hoveringMax = false;
    if (!this.activeThumb) {
      this.showMaxTooltip.set(false);
    }
  }

  @HostListener('document:pointermove', ['$event'])
  protected onDocumentPointerMove(event: PointerEvent): void {
    if (!this.activeThumb) {
      return;
    }

    const track = this.trackRef()?.nativeElement;
    if (!track) {
      return;
    }

    let nextValue = this.valueFromPointer(event.clientX, track);

    if (this.activeThumb === 'min') {
      nextValue = Math.min(nextValue, this.currentMax());
      this.emitChange(
        clampNumberRange({ ...this.value(), min: nextValue }, this.min(), this.max(), 'min'),
      );
      return;
    }

    nextValue = Math.max(nextValue, this.currentMin());
    this.emitChange(
      clampNumberRange({ ...this.value(), max: nextValue }, this.min(), this.max(), 'max'),
    );
  }

  @HostListener('document:pointerup')
  protected onDocumentPointerUp(): void {
    this.activeThumb = null;

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

  private valueToPercent(value: number): number {
    const span = this.max() - this.min();
    if (span <= 0) {
      return 0;
    }

    return (value - this.min()) / span;
  }

  private valueFromPointer(clientX: number, track: HTMLElement): number {
    const rect = track.getBoundingClientRect();
    const thumbRadius = THUMB_SIZE_PX / 2;
    const usableWidth = Math.max(rect.width - THUMB_SIZE_PX, 1);
    const offsetX = Math.max(thumbRadius, Math.min(rect.width - thumbRadius, clientX - rect.left));
    const ratio = (offsetX - thumbRadius) / usableWidth;
    return valueFromTrackPercent(ratio * 100, this.min(), this.max(), this.step());
  }

  private unitSuffix(): string {
    const key = this.unitSuffixKey();
    return key ? this.translate.instant(key) : '';
  }

  private emitChange(next: NumberRangeFilterValue): void {
    if (!isNarrowedNumberRange(next, this.min(), this.max())) {
      this.valueChange.emit({});
      return;
    }

    this.valueChange.emit(next);
  }
}
