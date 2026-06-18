import { ChangeDetectionStrategy, Component, HostListener, effect, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';

import { DETAIL_MODAL_CLOSE_ACTION_ID } from '../detail-modal.constants';
import { DetailModalService } from '../detail-modal.service';
import type { ActiveDetailModalRequest } from '../detail-modal.types';
import { DetailViewComponent } from '../detail-view/detail-view.component';

@Component({
  selector: 'app-detail-modal',
  imports: [TranslatePipe, LucideDynamicIcon, LucideX, DetailViewComponent],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailModalComponent {
  private readonly detailModalService = inject(DetailModalService);

  protected readonly activeRequest = signal<ActiveDetailModalRequest | null>(null);

  private previousBodyOverflow = '';

  constructor() {
    effect(() => {
      const request = this.detailModalService.request();
      this.activeRequest.set(request);
      this.syncBodyScroll(request !== null);
    });
  }

  protected onBackdropClick(): void {
    this.detailModalService.resolve({ actionId: DETAIL_MODAL_CLOSE_ACTION_ID });
  }

  protected onClose(): void {
    this.detailModalService.resolve({ actionId: DETAIL_MODAL_CLOSE_ACTION_ID });
  }

  protected onAction(actionId: string): void {
    this.detailModalService.resolve({ actionId });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeRequest()) {
      this.detailModalService.resolve({ actionId: DETAIL_MODAL_CLOSE_ACTION_ID });
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
