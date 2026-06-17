import type { LucideIcon } from '@lucide/angular';
import type { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export type FormMode = 'single' | 'stepper';

export type ValidationState = 'notStarted' | 'inProgress' | 'valid' | 'invalid';

export type StepperMode = 'create' | 'edit';

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'password'
  | 'select'
  | 'autocomplete'
  | 'textarea'
  | 'radio'
  | 'toggle'
  | 'checkbox'
  | 'custom';

export type ColSpan = 1 | 2 | 3 | 4 | 5 | 'full';

export type DateInputBoundValue = string | 'today';

export type DateInputBound<T> =
  | DateInputBoundValue
  | ((value: Partial<T>) => DateInputBoundValue | undefined);

export interface SelectOption {
  value: string;
  labelKey?: string;
  label?: string;
}

export interface RadioOption {
  value: string;
  labelKey: string;
  descriptionKey?: string;
}

export interface FieldDef<T, K extends keyof T & string = keyof T & string> {
  key: K;
  type: FieldType;
  labelKey?: string;
  placeholderKey?: string;
  descriptionKey?: string;
  autocomplete?: string;
  colSpan?: ColSpan;
  hidden?: (value: Partial<T>) => boolean;
  disabled?: (value: Partial<T>) => boolean;
  options?: SelectOption[] | RadioOption[];
  rows?: number;
  minDate?: DateInputBound<T>;
  maxDate?: DateInputBound<T>;
  validators?: ValidatorFn[];
  errorKeys?: Partial<Record<string, string>>;
}

export interface FormSectionDef<T> {
  id: string;
  titleKey?: string;
  subtitleKey?: string;
  icon?: LucideIcon;
  fields?: readonly FieldDef<T>[];
  kind?: 'fields' | 'template';
  slots?: ('before' | 'after' | 'footer')[];
}

export interface FormStepDef<T> {
  id: string;
  titleKey?: string;
  kind: 'fields' | 'template';
  sections?: readonly FormSectionDef<T>[];
  validate?: (form: FormGroup) => boolean;
}

export interface FormActionsDef {
  previous?: { labelKey: string };
  next?: { labelKey: string };
  submit?: { labelKey: string; icon?: LucideIcon };
}

export interface FormDefinition<T> {
  mode: FormMode;
  steps: readonly FormStepDef<T>[];
  actions: FormActionsDef;
  gridCols?: number;
}

/** Any form definition shape (used for key helper constraints). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFormDefinition = FormDefinition<any>;

/** Model type from a form definition instance. */
export type FormModelOf<D> = D extends FormDefinition<infer T> ? T : never;

/** Step ids declared on a form definition. */
export type FormStepIdsOf<D extends AnyFormDefinition> = D['steps'][number]['id'];

type StepById<D extends AnyFormDefinition, StepId extends FormStepIdsOf<D>> = Extract<
  D['steps'][number],
  { id: StepId }
>;

/** Section ids for a given step on a form definition. */
export type FormSectionIdsOf<
  D extends AnyFormDefinition,
  StepId extends FormStepIdsOf<D>,
> = StepById<D, StepId> extends { sections?: readonly (infer S)[] }
  ? S extends { id: infer Id }
    ? Id
    : never
  : never;

type SectionById<
  D extends AnyFormDefinition,
  StepId extends FormStepIdsOf<D>,
  SectionId extends FormSectionIdsOf<D, StepId>,
> = Extract<NonNullable<StepById<D, StepId>['sections']>[number], { id: SectionId }>;

/** Field keys declared in a section's `fields` array (for custom/built-in templates). */
export type FormFieldKeysInSection<
  D extends AnyFormDefinition,
  StepId extends FormStepIdsOf<D>,
  SectionId extends FormSectionIdsOf<D, StepId>,
> = SectionById<D, StepId, SectionId> extends { fields?: readonly { key: infer K }[] }
  ? K extends keyof FormModelOf<D> & string
    ? K
    : never
  : never;

export interface FormFieldContext<T> {
  $implicit: Partial<T>;
  control: AbstractControl;
  field: FieldDef<T>;
  stepId: string;
  sectionId: string;
}

export interface FormStepContext<T> {
  $implicit: Partial<T>;
  form: FormGroup;
  stepId: string;
  stepIndex: number;
}

export interface FormSectionContext<T> {
  $implicit: Partial<T>;
  form: FormGroup;
  stepId: string;
  sectionId: string;
}
