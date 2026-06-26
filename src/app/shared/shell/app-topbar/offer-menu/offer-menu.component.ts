import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucidePlus } from '@lucide/angular';

import { entityContextClass } from '../../../constants/entity-context-class';
import { USER_OFFER_OPTIONS } from '../../../../portal/user/user-offer-options.config';

@Component({
  selector: 'app-offer-menu',
  imports: [TranslatePipe, NgClass, NgComponentOutlet, LucidePlus],
  templateUrl: './offer-menu.component.html',
  styleUrl: './offer-menu.component.scss',
})
export class OfferMenuComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  readonly menuOpenChange = output<boolean>();

  protected readonly options = USER_OFFER_OPTIONS;
  protected readonly menuOpen = signal(false);
  protected readonly iconInputs = { size: 18 };
  protected readonly entityContextClass = entityContextClass;

  close(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.menuOpenChange.emit(false);
    }
  }

  protected toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    this.menuOpenChange.emit(next);
  }

  protected selectOption(createUrl: string): void {
    this.close();
    void this.router.navigateByUrl(createUrl);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
