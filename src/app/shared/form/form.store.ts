import { computed, signal, type WritableSignal } from '@angular/core';

import type { FormDefinition, FormStepDef } from './form.types';

export class FormStore<T extends object> {
  readonly stepIndex: WritableSignal<number>;
  readonly totalSteps: number;
  readonly currentStep = computed(
    () => this.definition.steps[this.stepIndex()] as FormStepDef<T>,
  );
  readonly isFirstStep = computed(() => this.stepIndex() === 0);
  readonly isLastStep = computed(() => this.stepIndex() === this.totalSteps - 1);

  constructor(private readonly definition: FormDefinition<T>) {
    this.stepIndex = signal(0);
    this.totalSteps = definition.steps.length;
  }

  next(): void {
    if (!this.isLastStep()) {
      this.stepIndex.update((index) => index + 1);
    }
  }

  previous(): void {
    if (!this.isFirstStep()) {
      this.stepIndex.update((index) => index - 1);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.totalSteps) {
      this.stepIndex.set(index);
    }
  }

  reset(): void {
    this.stepIndex.set(0);
  }
}
