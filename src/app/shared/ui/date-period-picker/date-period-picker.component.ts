import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCalendar, LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

import { formatDisplayDate } from '../../utils/format-display-date';
import {
  buildCalendarMonth,
  initialCalendarMonth,
  isDatePeriodDisabled,
  sanitizeDatePeriodValue,
  type CalendarCell,
  type DatePeriodValue,
} from '../../utils/date-input';

@Component({
  selector: 'app-date-period-picker',
  imports: [TranslatePipe, LucideCalendar, LucideChevronLeft, LucideChevronRight],
  templateUrl: './date-period-picker.component.html',
  styleUrl: './date-period-picker.component.scss',
})
export class DatePeriodPickerComponent {
  readonly value = input<DatePeriodValue>({});
  readonly minDate = input<string | null>(null);
  readonly mode = input<'range' | 'single'>('range');
  readonly allowPartial = input(true);
  readonly placeholderKey = input('shared.datePeriod.placeholder');
  readonly variant = input<'form' | 'filter'>('form');

  valueChange = output<DatePeriodValue>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly panelOpen = signal(false);
  protected readonly pickingEnd = signal(false);
  protected readonly hoveredIso = signal<string | null>(null);
  protected readonly viewYear = signal(new Date().getFullYear());
  protected readonly viewMonth = signal(new Date().getMonth() + 1);

  protected readonly weekdayKeys = [
    'shared.datePeriod.weekdays.mon',
    'shared.datePeriod.weekdays.tue',
    'shared.datePeriod.weekdays.wed',
    'shared.datePeriod.weekdays.thu',
    'shared.datePeriod.weekdays.fri',
    'shared.datePeriod.weekdays.sat',
    'shared.datePeriod.weekdays.sun',
  ] as const;

  protected readonly displayText = computed(() => {
    const current = this.value();
    const from = current.from?.trim();
    const to = current.to?.trim();

    if (this.mode() === 'single') {
      return from ? formatDisplayDate(from) : '';
    }

    if (from && to) {
      return `${formatDisplayDate(from)} – ${formatDisplayDate(to)}`;
    }

    if (from) {
      return `${formatDisplayDate(from)} – …`;
    }

    if (to) {
      return `… – ${formatDisplayDate(to)}`;
    }

    return '';
  });

  protected readonly calendarWeeks = computed(() =>
    buildCalendarMonth(this.viewYear(), this.viewMonth()),
  );

  protected readonly monthLabelKey = computed(() => {
    const month = this.viewMonth();
    const keys = [
      'shared.datePeriod.months.jan',
      'shared.datePeriod.months.feb',
      'shared.datePeriod.months.mar',
      'shared.datePeriod.months.apr',
      'shared.datePeriod.months.may',
      'shared.datePeriod.months.jun',
      'shared.datePeriod.months.jul',
      'shared.datePeriod.months.aug',
      'shared.datePeriod.months.sep',
      'shared.datePeriod.months.oct',
      'shared.datePeriod.months.nov',
      'shared.datePeriod.months.dec',
    ] as const;

    return keys[month - 1] ?? keys[0];
  });

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    this.closePanel();
  }

  protected togglePanel(): void {
    if (this.panelOpen()) {
      this.closePanel();
      return;
    }

    const anchor = initialCalendarMonth(this.value(), this.minDate());
    this.viewYear.set(anchor.year);
    this.viewMonth.set(anchor.month);
    this.pickingEnd.set(Boolean(this.value().from && !this.value().to && this.mode() === 'range'));
    this.panelOpen.set(true);
  }

  protected previousMonth(): void {
    if (this.viewMonth() === 1) {
      this.viewMonth.set(12);
      this.viewYear.update((year) => year - 1);
      return;
    }

    this.viewMonth.update((month) => month - 1);
  }

  protected nextMonth(): void {
    if (this.viewMonth() === 12) {
      this.viewMonth.set(1);
      this.viewYear.update((year) => year + 1);
      return;
    }

    this.viewMonth.update((month) => month + 1);
  }

  protected isDayDisabled(cell: CalendarCell): boolean {
    return isDatePeriodDisabled(cell.iso, {
      minDate: this.minDate(),
      from: this.value().from,
      pickingEnd: this.pickingEnd(),
      mode: this.mode(),
    });
  }

  protected dayState(cell: CalendarCell): string {
    const from = this.value().from?.trim();
    const to = this.value().to?.trim();
    const iso = cell.iso;
    const hover = this.hoveredIso();

    if (from && to) {
      if (iso === from) {
        return 'start';
      }

      if (iso === to) {
        return 'end';
      }

      if (iso > from && iso < to) {
        return 'in-range';
      }

      return 'default';
    }

    if (from && !to && this.mode() === 'range') {
      if (iso === from) {
        return hover && hover > from ? 'start' : 'selected';
      }

      if (hover && hover >= from && !this.isDayDisabled(cell)) {
        if (iso === hover) {
          return hover === from ? 'selected' : 'preview-selected-end';
        }

        if (iso > from && iso < hover) {
          return 'preview-in-range';
        }
      }

      return 'default';
    }

    if (from && iso === from && this.mode() === 'single') {
      return 'selected';
    }

    if (hover === iso && !this.isDayDisabled(cell)) {
      return 'preview-selected';
    }

    return 'default';
  }

  protected onDayMouseEnter(cell: CalendarCell): void {
    if (this.isDayDisabled(cell)) {
      this.hoveredIso.set(null);
      return;
    }

    const from = this.value().from?.trim();
    const to = this.value().to?.trim();

    if (this.mode() === 'range' && from && !to) {
      if (cell.iso < from) {
        this.hoveredIso.set(null);
        return;
      }

      this.hoveredIso.set(cell.iso);
      return;
    }

    if (this.mode() === 'range' || this.mode() === 'single') {
      this.hoveredIso.set(cell.iso);
    }
  }

  protected onGridMouseLeave(): void {
    this.hoveredIso.set(null);
  }

  protected onDayClick(cell: CalendarCell): void {
    if (this.isDayDisabled(cell)) {
      return;
    }

    if (this.mode() === 'single') {
      this.emitValue({ from: cell.iso });
      this.closePanel();
      return;
    }

    const current = this.value();
    const from = current.from;
    const to = current.to;

    if (!from || (from && to)) {
      this.pickingEnd.set(true);
      this.emitValue({ from: cell.iso });
      return;
    }

    if (cell.iso < from) {
      this.pickingEnd.set(true);
      this.emitValue({ from: cell.iso });
      return;
    }

    this.emitValue({ from, to: cell.iso });
    this.pickingEnd.set(false);
    this.closePanel();
  }

  protected clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.pickingEnd.set(false);
    this.hoveredIso.set(null);
    this.emitValue({});
  }

  private emitValue(next: DatePeriodValue): void {
    const cleaned = sanitizeDatePeriodValue(next, {
      minDate: this.minDate(),
      allowPartial: this.allowPartial(),
    });
    this.valueChange.emit(cleaned);
  }

  private closePanel(): void {
    this.panelOpen.set(false);
    this.pickingEnd.set(false);
    this.hoveredIso.set(null);
  }
}
