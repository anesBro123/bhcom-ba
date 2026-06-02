import type {
  AnyFormDefinition,
  FormDefinition,
  FormFieldKeysInSection,
  FormSectionIdsOf,
  FormStepIdsOf,
} from './form.types';

export function defineForm<T extends object>() {
  return <const D extends FormDefinition<T>>(definition: D): D => definition;
}

export function formStepKey<
  const D extends AnyFormDefinition,
  const StepId extends FormStepIdsOf<D>,
>(_form: D, stepId: StepId): StepId {
  return stepId;
}

export function formSectionKey<
  const D extends AnyFormDefinition,
  const StepId extends FormStepIdsOf<D>,
  const SectionId extends FormSectionIdsOf<D, StepId>,
>(_form: D, stepId: StepId, sectionId: SectionId): `${StepId}:${SectionId}` {
  return `${stepId}:${sectionId}`;
}

export function formFieldKey<
  const D extends AnyFormDefinition,
  const StepId extends FormStepIdsOf<D>,
  const SectionId extends FormSectionIdsOf<D, StepId>,
  const FieldKey extends FormFieldKeysInSection<D, StepId, SectionId>,
>(
  _form: D,
  stepId: StepId,
  sectionId: SectionId,
  fieldKey: FieldKey,
): `${StepId}:${SectionId}:${FieldKey}` {
  return `${stepId}:${sectionId}:${fieldKey}`;
}
