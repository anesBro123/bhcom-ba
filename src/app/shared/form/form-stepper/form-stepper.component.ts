import { Component, ElementRef, effect, input, output, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideCheck } from '@lucide/angular';

import type { FormStepDef } from '../form.types';

@Component({
  selector: 'app-form-stepper',
  imports: [TranslatePipe, LucideCheck],
  templateUrl: './form-stepper.component.html',
  styleUrl: './form-stepper.component.scss',
})
export class FormStepperComponent<T extends object> {
  readonly steps = input.required<readonly FormStepDef<T>[]>();
  readonly stepIndex = input.required<number>();
  readonly progressPercent = input.required<number>();
  readonly clickableSteps = input<boolean[]>([]);
  readonly stepCompleted = input<boolean[]>([]);
  readonly stepErrors = input<boolean[]>([]);

  readonly stepSelect = output<number>();

  private readonly stepsNav = viewChild<ElementRef<HTMLElement>>('stepsNav');

  protected readonly markerIconSize = 12;

  constructor() {
    effect(() => {
      const index = this.stepIndex();
      requestAnimationFrame(() => this.scrollStepIntoView(index));
    });
  }

  protected isCompleted(index: number): boolean {
    return this.stepCompleted()[index] ?? false;
  }

  protected isActive(index: number): boolean {
    return index === this.stepIndex();
  }

  protected isClickable(index: number): boolean {
    return this.clickableSteps()[index] ?? false;
  }

  protected hasError(index: number): boolean {
    return this.stepErrors()[index] ?? false;
  }

  protected showCheck(index: number): boolean {
    return this.isCompleted(index) && !this.hasError(index);
  }

  private scrollStepIntoView(index: number): void {
    const nav = this.stepsNav()?.nativeElement;
    const step = nav?.querySelector<HTMLElement>(`[data-step-index="${index}"]`);
    step?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }
}
