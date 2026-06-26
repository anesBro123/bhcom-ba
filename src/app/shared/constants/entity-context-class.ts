import type { AdminEntityTab } from './admin-urls';
import type { UserEntityTab } from './user-urls';

export type EntityContextTab = UserEntityTab | AdminEntityTab;

export function entityContextClass(tab: EntityContextTab | null | undefined): string {
  return tab ? `entity-context--${tab}` : '';
}
