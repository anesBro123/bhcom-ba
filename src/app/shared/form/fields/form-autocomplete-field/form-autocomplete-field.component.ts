import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { normalizeForSearch } from '../../../utils/normalize-for-search';
import { FormFieldErrorComponent } from '../../form-field-error/form-field-error.component';
import type { FieldDef, SelectOption } from '../../form.types';

const MAX_SUGGESTIONS = 10;
const BLUR_CLOSE_DELAY_MS = 150;

@Component({
  selector: 'app-form-autocomplete-field',
  imports: [ReactiveFormsModule, TranslatePipe, FormFieldErrorComponent],
  templateUrl: './form-autocomplete-field.component.html',
  styleUrl: './form-autocomplete-field.component.scss',
})
export class FormAutocompleteFieldComponent<T extends object> implements OnInit {
  readonly control = input.required<AbstractControl>();
  readonly field = input.required<FieldDef<T>>();

  private readonly destroyRef = inject(DestroyRef);

  protected readonly panelOpen = signal(false);
  protected readonly activeIndex = signal(-1);
  protected readonly queryText = signal('');

  protected readonly suggestions = computed(() => {
    const options = (this.field().options ?? []) as SelectOption[];
    const query = normalizeForSearch(this.queryText());

    if (!query) {
      return [];
    }

    return options
      .filter((option) => normalizeForSearch(this.optionLabel(option)).includes(query))
      .slice(0, MAX_SUGGESTIONS);
  });

  ngOnInit(): void {
    this.control()
      .valueChanges.pipe(startWith(this.control().value), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.queryText.set((value as string | null) ?? '');
      });
  }

  protected onFocus(): void {
    this.syncQueryFromControl();
    if (this.queryText().trim()) {
      this.panelOpen.set(true);
    }
    this.activeIndex.set(-1);
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.queryText.set(value);
    this.panelOpen.set(value.trim().length > 0);
    this.activeIndex.set(-1);
  }

  protected onBlur(): void {
    window.setTimeout(() => {
      this.panelOpen.set(false);
      this.activeIndex.set(-1);
    }, BLUR_CLOSE_DELAY_MS);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const items = this.suggestions();

    if (event.key === 'Escape') {
      this.panelOpen.set(false);
      this.activeIndex.set(-1);
      return;
    }

    if (!this.panelOpen() || items.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((index) => Math.min(index + 1, items.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter' && this.activeIndex() >= 0) {
      event.preventDefault();
      this.selectOption(items[this.activeIndex()]!);
    }
  }

  protected selectOption(option: SelectOption): void {
    const label = this.optionLabel(option);
    this.control().setValue(option.value);
    this.queryText.set(label);
    this.panelOpen.set(false);
    this.activeIndex.set(-1);
  }

  protected optionLabel(option: SelectOption): string {
    return option.label ?? option.value;
  }

  private syncQueryFromControl(): void {
    this.queryText.set((this.control().value as string | null) ?? '');
  }
}
