import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  labelKey: string;
  route: string;
  exact?: boolean;
  icon?: LucideIcon;
}

/** Section with `route` is a single clickable nav link (user portal). Sections with `items` group admin links. */
export interface NavSection {
  titleKey: string;
  icon?: LucideIcon;
  route?: string;
  exact?: boolean;
  items?: NavItem[];
}
