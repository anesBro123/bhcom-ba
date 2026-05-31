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
import { LucideDynamicIcon, LucideEllipsis } from '@lucide/angular';

import type { RowActionDef, RowActionEvent } from '../table.types';

@Component({
  selector: 'app-table-row-actions',
  imports: [TranslatePipe, LucideEllipsis, LucideDynamicIcon],
  templateUrl: './table-row-actions.component.html',
  styleUrl: './table-row-actions.component.scss',
})
export class TableRowActionsComponent<T extends object> {
  actions = input.required<RowActionDef<T>[]>();
  row = input.required<T>();

  action = output<RowActionEvent<T>>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly menuOpen = signal(false);

  protected readonly visibleActions = computed(() =>
    this.actions().filter((item) => this.isVisible(item)),
  );

  protected toggleMenu(): void {
    if (this.visibleActions().length === 0) {
      return;
    }

    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected isDisabled(action: RowActionDef<T>): boolean {
    return action.disabled?.(this.row()) ?? false;
  }

  protected showSeparatorBefore(action: RowActionDef<T>, index: number): boolean {
    if (!action.danger) {
      return false;
    }

    const visible = this.visibleActions();
    const firstDangerIndex = visible.findIndex((item) => item.danger);

    return index === firstDangerIndex && firstDangerIndex > 0;
  }

  protected selectAction(action: RowActionDef<T>): void {
    if (this.isDisabled(action)) {
      return;
    }

    this.action.emit({ actionId: action.id, row: this.row() });
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private isVisible(action: RowActionDef<T>): boolean {
    return action.visible?.(this.row()) !== false;
  }
}
