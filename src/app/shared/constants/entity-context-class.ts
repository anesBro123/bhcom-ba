import type { UserEntityTab } from './user-urls';

export function entityContextClass(tab: UserEntityTab | null | undefined): string {
  return tab ? `entity-context--${tab}` : '';
}
