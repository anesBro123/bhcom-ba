import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCheck, LucideCircle, LucidePencil, LucideTriangleAlert } from '@lucide/angular';

import { MOBILE_MEDIA_QUERY } from '../../constants/viewport';
import type { FormStepDef, ValidationState } from '../form.types';

@Component({
  selector: 'app-form-stepper',
  imports: [TranslatePipe, LucideCheck, LucideCircle, LucidePencil, LucideTriangleAlert],
  templateUrl: './form-stepper.component.html',
  styleUrl: './form-stepper.component.scss',
})
export class FormStepperComponent<T extends object> {
  readonly steps = input.required<readonly FormStepDef<T>[]>();
  readonly stepIndex = input.required<number>();
  readonly stepValidationStates = input<ValidationState[]>([]);

  readonly stepSelect = output<number>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly stepsNav = viewChild<ElementRef<HTMLElement>>('stepsNav');

  private mediaQuery: MediaQueryList | null = null;

  protected readonly isMobileLayout = signal(false);
  protected readonly statusIconSize = 12;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
      const updateLayout = (): void => {
        this.isMobileLayout.set(this.mediaQuery?.matches ?? false);
      };

      updateLayout();
      this.mediaQuery.addEventListener('change', updateLayout);

      this.destroyRef.onDestroy(() => {
        this.mediaQuery?.removeEventListener('change', updateLayout);
      });
    });

    effect(() => {
      const index = this.stepIndex();
      requestAnimationFrame(() => this.scrollStepIntoView(index));
    });
  }

  protected isActive(index: number): boolean {
    return index === this.stepIndex();
  }

  protected validationState(index: number): ValidationState {
    return this.stepValidationStates()[index] ?? 'notStarted';
  }

  protected validationStateKey(index: number): string {
    return `shared.form.common.validationState.${this.validationState(index)}`;
  }

  protected currentStepTitleKey(): string | undefined {
    return this.steps()[this.stepIndex()]?.titleKey;
  }

  protected statusIconSizeFor(index: number): number {
    return this.isMobileLayout() ? 9 : this.statusIconSize;
  }

  private scrollStepIntoView(index: number): void {
    if (this.isMobileLayout()) {
      return;
    }

    const nav = this.stepsNav()?.nativeElement;
    const step = nav?.querySelector<HTMLElement>(`[data-step-index="${index}"]`);
    step?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }
}
