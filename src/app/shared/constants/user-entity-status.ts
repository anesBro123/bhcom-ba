/** Interim shared status for user routes, cargo, and storage. Each entity will get its own status union later — see `.cursor/rules/entity-status.mdc`. */
export type UserEntityStatus = 'open' | 'in_progress' | 'canceled' | 'closed';

export const USER_ENTITY_STATUS_LABEL_KEYS: Record<UserEntityStatus, string> = {
  open: 'shared.entityStatus.open',
  in_progress: 'shared.entityStatus.inProgress',
  canceled: 'shared.entityStatus.canceled',
  closed: 'shared.entityStatus.closed',
};

export const USER_ENTITY_STATUS_OPTIONS: { value: UserEntityStatus; labelKey: string }[] = [
  { value: 'open', labelKey: USER_ENTITY_STATUS_LABEL_KEYS.open },
  { value: 'in_progress', labelKey: USER_ENTITY_STATUS_LABEL_KEYS.in_progress },
  { value: 'canceled', labelKey: USER_ENTITY_STATUS_LABEL_KEYS.canceled },
  { value: 'closed', labelKey: USER_ENTITY_STATUS_LABEL_KEYS.closed },
];

const USER_ENTITY_STATUS_SET = new Set<string>(USER_ENTITY_STATUS_OPTIONS.map((o) => o.value));

export function isUserEntityStatus(value: string): value is UserEntityStatus {
  return USER_ENTITY_STATUS_SET.has(value);
}
