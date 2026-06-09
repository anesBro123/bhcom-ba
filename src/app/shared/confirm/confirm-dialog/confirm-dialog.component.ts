import { Component, HostListener, effect, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ConfirmService } from '../confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [TranslatePipe],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  protected readonly confirmService = inject(ConfirmService);

  private previousBodyOverflow = '';

  constructor() {
    effect(() => {
      const isOpen = this.confirmService.request() !== null;
      this.syncBodyScroll(isOpen);
    });
  }

  protected onBackdropClick(): void {
    this.confirmService.resolve(false);
  }

  protected onCancel(): void {
    this.confirmService.resolve(false);
  }

  protected onConfirm(): void {
    this.confirmService.resolve(true);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.confirmService.request()) {
      this.confirmService.resolve(false);
    }
  }

  private syncBodyScroll(isOpen: boolean): void {
    if (isOpen) {
      this.previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = this.previousBodyOverflow;
  }
}
