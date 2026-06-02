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
  getVisibleFields,
  validateStepControls,
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
    this.formStore.previous();
    this.stepChange.emit({ from, to: this.formStore.stepIndex() });
  }

  protected onNext(): void {
    if (!this.validateCurrentStep()) {
      return;
    }

    const from = this.formStore.stepIndex();
    this.formStore.next();
    this.stepChange.emit({ from, to: this.formStore.stepIndex() });
  }

  protected onSubmit(): void {
    if (!this.validateCurrentStep()) {
      return;
    }

    this.submit.emit();
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

  private validateCurrentStep(): boolean {
    return validateStepControls(this.formGroup(), this.currentStep(), this.formValue());
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
