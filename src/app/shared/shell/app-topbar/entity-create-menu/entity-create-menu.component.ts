import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LucidePlus } from '@lucide/angular';
import type { LucideIcon } from '@lucide/angular';

import { entityContextClass, type EntityContextTab } from '../../../constants/entity-context-class';

export interface EntityCreateMenuOption {
  entityTab: EntityContextTab;
  labelKey: string;
  icon: LucideIcon;
  createUrl: string;
}

@Component({
  selector: 'app-entity-create-menu',
  imports: [TranslatePipe, NgClass, NgComponentOutlet, LucidePlus],
  templateUrl: './entity-create-menu.component.html',
  styleUrl: './entity-create-menu.component.scss',
})
export class EntityCreateMenuComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  readonly options = input.required<EntityCreateMenuOption[]>();
  readonly openMenuAriaLabelKey = input.required<string>();
  readonly menuOpenChange = output<boolean>();

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
