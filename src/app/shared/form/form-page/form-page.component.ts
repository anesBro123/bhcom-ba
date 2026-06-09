import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
  OnInit,
  QueryList,
  TemplateRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { FormFieldTemplateDirective } from '../form-field-template.directive';
import { FormSectionTemplateDirective } from '../form-section-template.directive';
import { FormStepTemplateDirective } from '../form-step-template.directive';
import { FormFieldRendererComponent } from '../form-field-renderer/form-field-renderer.component';
import { FormFooterComponent } from '../form-footer/form-footer.component';
import { FormGridComponent } from '../form-grid/form-grid.component';
import { FormSectionComponent } from '../form-section/form-section.component';
import { FormStepperComponent } from '../form-stepper/form-stepper.component';
import { FormStore } from '../form.store';
import {
  applyFieldDisabledState,
  buildFieldTemplateKey,
  canNavigateToStep,
  getVisibleFields,
  isStepValid,
  validateStepControls,
  type StepperNavigationMode,
} from '../form.utils';
import type {
  FormDefinition,
  FormFieldContext,
  FormSectionContext,
  FormStepContext,
} from '../form.types';

@Component({
  selector: 'app-form-page',
  imports: [
    NgTemplateOutlet,
    TranslatePipe,
    FormStepperComponent,
    FormSectionComponent,
    FormGridComponent,
    FormFieldRendererComponent,
    FormFooterComponent,
  ],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent<T extends object> implements OnInit, AfterContentInit {
  definition = input.required<FormDefinition<T>>();
  formGroup = input.required<FormGroup>();
  submitDisabled = input(false);
  stepperNavigation = input<StepperNavigationMode>('strict');

  submit = output<void>();
  stepChange = output<{ from: number; to: number }>();

  @ContentChildren(FormFieldTemplateDirective)
  private readonly fieldTemplateDirectives!: QueryList<FormFieldTemplateDirective>;

  @ContentChildren(FormStepTemplateDirective)
  private readonly stepTemplateDirectives!: QueryList<FormStepTemplateDirective>;

  @ContentChildren(FormSectionTemplateDirective)
  private readonly sectionTemplateDirectives!: QueryList<FormSectionTemplateDirective>;

  private readonly destroyRef = inject(DestroyRef);

  protected formStore!: FormStore<T>;
  protected readonly formValue = signal<Partial<T>>({});
  private readonly visitedSteps = signal<ReadonlySet<number>>(new Set([0]));
  protected readonly fieldTemplateMap = signal(new Map<string, TemplateRef<FormFieldContext<T>>>());
  protected readonly stepTemplateMap = signal(new Map<string, TemplateRef<FormStepContext<T>>>());
  protected readonly sectionTemplateMap = signal(
    new Map<string, TemplateRef<FormSectionContext<T>>>(),
  );

  protected readonly isStepper = computed(() => this.definition().mode === 'stepper');
  protected readonly showStepper = computed(
    () => this.isStepper() && this.definition().steps.length > 1,
  );
  protected readonly embedFooterInSection = computed(() => {
    if (!this.formStore) {
      return false;
    }

    this.formStore.stepIndex();
    const step = this.formStore.currentStep();
    if (step.kind !== 'fields') {
      return false;
    }

    const fieldSections = (step.sections ?? []).filter(
      (section) => this.sectionKind(section) !== 'template',
    );
    return fieldSections.length === 1;
  });

  protected readonly stepClickable = computed(() => {
    if (!this.formStore) {
      return [];
    }

    const steps = this.definition().steps;
    const currentIndex = this.formStore.stepIndex();
    const value = this.formValue();
    const mode = this.stepperNavigation();

    return steps.map((_, index) =>
      canNavigateToStep(this.formGroup(), steps, currentIndex, index, value, mode),
    );
  });

  protected readonly stepCompleted = computed(() => {
    if (!this.formStore) {
      return [];
    }

    const currentIndex = this.formStore.stepIndex();
    const visited = this.visitedSteps();
    const form = this.formGroup();
    const value = this.formValue();

    return this.definition().steps.map(
      (step, index) =>
        index !== currentIndex &&
        visited.has(index) &&
        isStepValid(form, step, value),
    );
  });

  protected readonly stepErrors = computed(() => {
    if (!this.formStore) {
      return [];
    }

    const currentIndex = this.formStore.stepIndex();
    const visited = this.visitedSteps();
    const form = this.formGroup();
    const value = this.formValue();

    return this.definition().steps.map(
      (step, index) =>
        index !== currentIndex &&
        visited.has(index) &&
        !isStepValid(form, step, value),
    );
  });

  ngOnInit(): void {
    this.formStore = new FormStore(this.definition());
    this.syncFormValue();

    this.formGroup()
      .valueChanges.pipe(startWith(this.formGroup().getRawValue()), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.formValue.set(value as Partial<T>);
        this.applyDisabledState();
      });
  }

  ngAfterContentInit(): void {
    this.syncTemplates();
    this.fieldTemplateDirectives.changes.subscribe(() => this.syncTemplates());
    this.stepTemplateDirectives.changes.subscribe(() => this.syncTemplates());
    this.sectionTemplateDirectives.changes.subscribe(() => this.syncTemplates());
  }

  protected currentStep() {
    return this.formStore.currentStep();
  }

  protected onPrevious(): void {
    const from = this.formStore.stepIndex();
    const to = from - 1;
    if (to < 0) {
      return;
    }

    this.navigateToStep(from, to);
  }

  protected onNext(): void {
    if (!this.validateCurrentStep()) {
      return;
    }

    const from = this.formStore.stepIndex();
    const to = from + 1;
    if (to >= this.definition().steps.length) {
      return;
    }

    this.navigateToStep(from, to);
  }

  protected onSubmit(): void {
    if (!this.validateAllSteps()) {
      return;
    }

    this.submit.emit();
  }

  protected onStepClick(targetIndex: number): void {
    if (!this.formStore || targetIndex === this.formStore.stepIndex()) {
      return;
    }

    if (!this.validateCurrentStep()) {
      return;
    }

    const steps = this.definition().steps;
    const currentIndex = this.formStore.stepIndex();
    const value = this.formValue();
    const mode = this.stepperNavigation();
    const form = this.formGroup();

    if (
      !canNavigateToStep(form, steps, currentIndex, targetIndex, value, mode) &&
      mode === 'strict' &&
      targetIndex > currentIndex
    ) {
      for (let index = currentIndex + 1; index < targetIndex; index++) {
        const step = steps[index];
        if (step && !isStepValid(form, step, value)) {
          validateStepControls(form, step, value);
          this.navigateToStep(currentIndex, index);
          return;
        }
      }
      return;
    }

    if (!canNavigateToStep(form, steps, currentIndex, targetIndex, value, mode)) {
      return;
    }

    this.navigateToStep(currentIndex, targetIndex);
  }

  protected fieldTemplate(
    stepId: string,
    sectionId: string,
    fieldKey: string,
  ): TemplateRef<FormFieldContext<T>> | null {
    return this.fieldTemplateMap().get(buildFieldTemplateKey(stepId, sectionId, fieldKey)) ?? null;
  }

  protected stepTemplate(stepId: string): TemplateRef<FormStepContext<T>> | null {
    return this.stepTemplateMap().get(stepId) ?? null;
  }

  protected sectionTemplate(stepId: string, sectionId: string): TemplateRef<FormSectionContext<T>> | null {
    return this.sectionTemplateMap().get(`${stepId}:${sectionId}`) ?? null;
  }

  protected visibleFields(section: { fields?: readonly import('../form.types').FieldDef<T>[] }) {
    return getVisibleFields(section.fields, this.formValue());
  }

  protected sectionKind(section: { kind?: 'fields' | 'template' }): 'fields' | 'template' {
    return section.kind ?? 'fields';
  }

  protected stepContext(stepId: string): FormStepContext<T> {
    return {
      $implicit: this.formValue(),
      form: this.formGroup(),
      stepId,
      stepIndex: this.formStore.stepIndex(),
    };
  }

  protected sectionContext(stepId: string, sectionId: string): FormSectionContext<T> {
    return {
      $implicit: this.formValue(),
      form: this.formGroup(),
      stepId,
      sectionId,
    };
  }

  protected hasFooterSlot(section: { slots?: string[] }): boolean {
    return section.slots?.includes('footer') ?? false;
  }

  private navigateToStep(from: number, to: number): void {
    this.markVisited(from, to);
    this.formStore.goTo(to);
    this.stepChange.emit({ from, to });
    this.applyDisabledState();
  }

  private markVisited(...indices: number[]): void {
    this.visitedSteps.update((current) => {
      const next = new Set(current);
      for (const index of indices) {
        next.add(index);
      }
      return next;
    });
  }

  private validateCurrentStep(): boolean {
    return validateStepControls(this.formGroup(), this.currentStep(), this.formValue());
  }

  private validateAllSteps(): boolean {
    if (!this.isStepper()) {
      return this.validateCurrentStep();
    }

    const form = this.formGroup();
    const value = this.formValue();

    for (const step of this.definition().steps) {
      if (!validateStepControls(form, step, value)) {
        return false;
      }
    }

    return true;
  }

  private syncFormValue(): void {
    this.formValue.set(this.formGroup().getRawValue() as Partial<T>);
    this.applyDisabledState();
  }

  private applyDisabledState(): void {
    applyFieldDisabledState(this.formGroup(), this.currentStep().sections, this.formValue());
  }

  private syncTemplates(): void {
    const fieldMap = new Map<string, TemplateRef<FormFieldContext<T>>>();
    for (const directive of this.fieldTemplateDirectives ?? []) {
      fieldMap.set(
        directive.fieldKey(),
        directive.template as TemplateRef<FormFieldContext<T>>,
      );
    }

    const stepMap = new Map<string, TemplateRef<FormStepContext<T>>>();
    for (const directive of this.stepTemplateDirectives ?? []) {
      stepMap.set(directive.stepKey(), directive.template as TemplateRef<FormStepContext<T>>);
    }

    const sectionMap = new Map<string, TemplateRef<FormSectionContext<T>>>();
    for (const directive of this.sectionTemplateDirectives ?? []) {
      sectionMap.set(
        directive.sectionKey(),
        directive.template as TemplateRef<FormSectionContext<T>>,
      );
    }

    this.fieldTemplateMap.set(fieldMap);
    this.stepTemplateMap.set(stepMap);
    this.sectionTemplateMap.set(sectionMap);
  }
}
