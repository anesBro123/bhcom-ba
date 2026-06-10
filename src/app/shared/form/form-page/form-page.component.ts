import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
  effect,
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
  getVisibleFields,
  isStepValid,
  resolveStepValidationState,
  runStepValidation,
} from '../form.utils';
import type {
  FormDefinition,
  FormFieldContext,
  FormSectionContext,
  FormStepContext,
  StepperMode,
  ValidationState,
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
  stepperMode = input<StepperMode>('create');
  stepperDataReady = input(false);

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
  private readonly engagedSteps = signal<ReadonlySet<number>>(new Set([0]));
  private readonly stepOutcomes = signal<ReadonlyMap<number, 'valid' | 'invalid'>>(new Map());
  private readonly editValidated = signal(false);
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

  protected readonly stepValidationStates = computed((): ValidationState[] => {
    if (!this.formStore) {
      return [];
    }

    const form = this.formGroup();
    const value = this.formValue();
    const currentIndex = this.formStore.stepIndex();
    const engaged = this.engagedSteps();
    const outcomes = this.stepOutcomes();
    const mode = this.stepperMode();
    const editValidated = this.editValidated();

    return this.definition().steps.map((step, index) =>
      resolveStepValidationState(form, step, index, currentIndex, value, {
        mode,
        engagedSteps: engaged,
        stepOutcomes: outcomes,
        editValidated,
      }),
    );
  });

  constructor() {
    effect(() => {
      const mode = this.stepperMode();
      const ready = this.stepperDataReady();

      if (mode !== 'edit' || !ready || this.editValidated() || !this.formStore) {
        return;
      }

      this.validateAllSteps({ markTouched: false, recordOutcomes: true });
      const allIndices = new Set(this.definition().steps.map((_, index) => index));
      this.engagedSteps.set(allIndices);
      this.editValidated.set(true);

      const currentIndex = this.formStore.stepIndex();
      if (this.isStepKnownInvalid(currentIndex)) {
        this.validateStep(currentIndex, { markTouched: true });
      }
    });
  }

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
    const from = this.formStore.stepIndex();
    const to = from + 1;
    if (to >= this.definition().steps.length) {
      return;
    }

    this.navigateToStep(from, to);
  }

  protected onSubmit(): void {
    if (!this.validateAllSteps({ markTouched: true, recordOutcomes: true, navigateToFirstInvalid: true })) {
      return;
    }

    this.submit.emit();
  }

  protected onStepClick(targetIndex: number): void {
    if (!this.formStore || targetIndex === this.formStore.stepIndex()) {
      return;
    }

    this.navigateToStep(this.formStore.stepIndex(), targetIndex);
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
    this.validateStep(from, { recordOutcome: true });
    this.engageStep(to);
    this.formStore.goTo(to);
    this.stepChange.emit({ from, to });
    this.applyDisabledState();

    if (this.isStepKnownInvalid(to)) {
      this.validateStep(to, { markTouched: true });
    }
  }

  private engageStep(index: number): void {
    this.engagedSteps.update((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }

  private validateStep(
    index: number,
    options: { markTouched?: boolean; recordOutcome?: boolean } = {},
  ): boolean {
    const step = this.definition().steps[index];
    if (!step) {
      return true;
    }

    const valid = runStepValidation(this.formGroup(), step, this.formValue(), {
      markTouched: options.markTouched ?? false,
    });

    if (options.recordOutcome) {
      this.stepOutcomes.update((current) => {
        const next = new Map(current);
        next.set(index, valid ? 'valid' : 'invalid');
        return next;
      });
    }

    return valid;
  }

  private isStepKnownInvalid(index: number): boolean {
    if (this.stepOutcomes().get(index) === 'invalid') {
      return true;
    }

    if (!this.editValidated()) {
      return false;
    }

    const step = this.definition().steps[index];
    return !!step && !isStepValid(this.formGroup(), step, this.formValue());
  }

  private validateAllSteps(
    options: {
      markTouched?: boolean;
      recordOutcomes?: boolean;
      navigateToFirstInvalid?: boolean;
    } = {},
  ): boolean {
    const markTouched = options.markTouched ?? true;
    const recordOutcomes = options.recordOutcomes ?? false;
    const navigateToFirstInvalid = options.navigateToFirstInvalid ?? false;

    if (!this.isStepper()) {
      return this.validateStep(this.formStore.stepIndex(), { markTouched });
    }

    const steps = this.definition().steps;
    let allValid = true;
    let firstInvalidIndex: number | null = null;

    for (let index = 0; index < steps.length; index++) {
      const valid = this.validateStep(index, { markTouched, recordOutcome: recordOutcomes });

      if (!valid) {
        allValid = false;
        if (firstInvalidIndex === null) {
          firstInvalidIndex = index;
        }
      }
    }

    if (!allValid && navigateToFirstInvalid && firstInvalidIndex !== null) {
      const from = this.formStore.stepIndex();
      if (from !== firstInvalidIndex) {
        this.engageStep(firstInvalidIndex);
        this.formStore.goTo(firstInvalidIndex);
        this.stepChange.emit({ from, to: firstInvalidIndex });
        this.applyDisabledState();
      }
    }

    return allValid;
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
