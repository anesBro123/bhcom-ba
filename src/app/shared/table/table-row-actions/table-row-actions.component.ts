import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideDynamicIcon, LucideEllipsis } from '@lucide/angular';

import type { RowActionDef, RowActionEvent } from '../table.types';

const MENU_GAP_PX = 6;
const MENU_VIEWPORT_PADDING_PX = 8;
const MENU_Z_INDEX = 100;

@Component({
  selector: 'app-table-row-actions',
  imports: [TranslatePipe, LucideEllipsis, LucideDynamicIcon],
  templateUrl: './table-row-actions.component.html',
  styleUrl: './table-row-actions.component.scss',
})
export class TableRowActionsComponent<T extends object> implements OnDestroy {
  actions = input.required<RowActionDef<T>[]>();
  row = input.required<T>();

  action = output<RowActionEvent<T>>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly menuRef = viewChild<ElementRef<HTMLElement>>('menu');

  protected readonly menuOpen = signal(false);
  protected readonly menuPositioned = signal(false);
  protected readonly menuStyle = signal<Record<string, string> | null>(null);

  protected readonly visibleActions = computed(() =>
    this.actions().filter((item) => this.isVisible(item)),
  );

  private readonly onScrollCapture = (): void => {
    if (this.menuOpen()) {
      this.updateMenuPosition();
    }
  };

  ngOnDestroy(): void {
    this.detachScrollListener();
  }

  protected toggleMenu(): void {
    if (this.visibleActions().length === 0) {
      return;
    }

    const willOpen = !this.menuOpen();
    this.menuOpen.set(willOpen);

    if (willOpen) {
      this.menuPositioned.set(false);
      this.attachScrollListener();
      afterNextRender(() => this.updateMenuPosition(), { injector: this.injector });
    } else {
      this.detachScrollListener();
      this.resetMenuPosition();
    }
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.detachScrollListener();
    this.resetMenuPosition();
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

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.menuOpen()) {
      this.updateMenuPosition();
    }
  }

  private updateMenuPosition(): void {
    const trigger = this.triggerRef().nativeElement;
    const menu = this.menuRef()?.nativeElement;

    if (!menu) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const menuHeight = menu.offsetHeight;
    const menuWidth = menu.offsetWidth;
    const spaceBelow = window.innerHeight - triggerRect.bottom - MENU_GAP_PX;
    const openUp = spaceBelow < menuHeight && triggerRect.top > spaceBelow;

    let top = openUp
      ? triggerRect.top - MENU_GAP_PX - menuHeight
      : triggerRect.bottom + MENU_GAP_PX;

    let left = triggerRect.right - menuWidth;

    left = Math.max(
      MENU_VIEWPORT_PADDING_PX,
      Math.min(left, window.innerWidth - menuWidth - MENU_VIEWPORT_PADDING_PX),
    );
    top = Math.max(
      MENU_VIEWPORT_PADDING_PX,
      Math.min(top, window.innerHeight - menuHeight - MENU_VIEWPORT_PADDING_PX),
    );

    this.menuStyle.set({
      top: `${top}px`,
      left: `${left}px`,
      zIndex: `${MENU_Z_INDEX}`,
    });
    this.menuPositioned.set(true);
  }

  private resetMenuPosition(): void {
    this.menuPositioned.set(false);
    this.menuStyle.set(null);
  }

  private attachScrollListener(): void {
    document.addEventListener('scroll', this.onScrollCapture, true);
  }

  private detachScrollListener(): void {
    document.removeEventListener('scroll', this.onScrollCapture, true);
  }

  private isVisible(action: RowActionDef<T>): boolean {
    return action.visible?.(this.row()) !== false;
  }
}
