/** Interim shared status for user routes, cargo, and storage. Each entity will get its own status union later — see `.cursor/rules/entity-status.mdc`. */
export type UserEntityStatus = 'open' | 'in_progress' | 'canceled' | 'closed';

export const USER_ENTITY_STATUS_LABEL_KEYS: Record<UserEntityStatus, string> = {
  open: 'shared.entityStatus.open',
  in_progress: 'shared.entityStatus.inProgress',
  canceled: 'shared.entityStatus.canceled',
  closed: 'shared.entityStatus.closed',
};
